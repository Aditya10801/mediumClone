import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { decode, sign, verify } from 'hono/jwt'
import {z} from 'zod'



const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
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

userRouter.post('/signup', async (c) => {
	const prisma = getPrisma(c.env);
	const body = await c.req.json();
	const user = await prisma.user.create({
		data:{
			email: body.email,
			name: body.name,
			password: body.password
		}
	})
	const secret = c.env.JWT_SECRET;
	const token = await sign({
        id: user.id,
		email:user.email,
		name : user.name
	},secret)

	return c.text(token);
});

userRouter.post('/signin', async (c) => {
	const prisma = getPrisma(c.env);
	const body = await c.req.json();
	const secret = c.env.JWT_SECRET;

	const user = await prisma.user.findUnique({
		where:{
			email:body.email
		}
	})

	if(!user){
		c.status(401);
		return c.text('Invalid email or password');
	}

	if(user.password != body.password){
		c.status(401);
		return c.text('Invalid email or password');
	}

	const token = await sign({
        id: user.id,
		email:user.email,
		name : user.name
	},secret)

	return c.text(token);
});


export default userRouter;