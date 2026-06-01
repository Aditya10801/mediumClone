import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { decode, sign, verify } from 'hono/jwt'
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.use('/api/v1/blog/*', async (c,next)=>{
	const authHeader= c.req.header('Authorization')?.split(" ")[1];
	if(!authHeader){
		c.status(401);
		return c.text('Unauthorized');
	}

	try{
		const secret = c.env.JWT_SECRET;
		const decoded = await verify(authHeader,secret,'HS256');
		if(decoded.id){
			next()
		}else{
			c.status(401);
			return c.text('Unauthorized');
		}
	} catch (error) {
		c.status(401);
		return c.text('Unauthorized');
	}

})


export function getPrisma(env: any) {
    
    const pool = new Pool({
        connectionString: env.DATABASE_URL
    });

   
    const adapter = new PrismaPg(pool);


    const prisma = new PrismaClient({ adapter });
    
    return prisma;
}




export default app;
