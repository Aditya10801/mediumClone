import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { verify } from 'hono/jwt'

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userid:string;
    };
}>();

export function getPrisma(env: any) {
    const pool = new Pool({
        connectionString: env.DATABASE_URL
    });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    return prisma;
}

blogRouter.use("/*",async(c,next)=>{
    const authHeader= c.req.header('Authorization')?.split(" ")[1];
    if(!authHeader){
        c.status(401);
        return c.text('Unauthorized');
    }

    try{
        const secret = c.env.JWT_SECRET;
        const decoded = await verify(authHeader,secret,'HS256');
        
        if(decoded.id){
            c.set("userid", String(decoded.id));
            await next();
            return;
        }else{
            c.status(401);
            return c.text('decode failed');
        }
    } catch (error) {
        c.status(401);
        return c.text('other error');
    } 
})

// 1. BULK ROUTE MUST BE ABOVE /:id 
// Added missing 'await' for the database call
blogRouter.get('/bulk', async (c) => {
    const prisma = getPrisma(c.env);
    const posts = await prisma.post.findMany(); 
    return c.json(posts);
});

// 2. DYNAMIC ROUTE
blogRouter.get('/:id', async (c) => {
    // FIX 1: Add ('id') to actually call the param function
    const id = c.req.param('id'); 
    const prisma = getPrisma(c.env);
    
    const post = await prisma.post.findUnique({
        where:{ 
            // FIX 2: Removed parseInt() because your ID is a string UUID
            id: id 
        }
    })
    return c.json(post);
});

blogRouter.post('/', async (c) => {
    const prisma = getPrisma(c.env);
    const body = await c.req.json();
    
    // You already verified the JWT in the middleware, so you can just grab the ID from context!
    const authorId = c.get("userid");
    
    await prisma.post.create({
        data:{
            title: body.title, 
            content: body.content, 
            authorId: authorId 
        }
    })
    return c.json({
        message : "Post created successfully"
    });
});

blogRouter.put('/', async (c) => {
    const prisma=getPrisma(c.env);
    const body=await c.req.json();
    await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title, 
            content: body.content
        }
    })

    return c.json({
        id : body.id
    })
});

export default blogRouter;