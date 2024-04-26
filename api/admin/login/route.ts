import { NextResponse } from "next/server";
import prisma from "../../../src/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
const scret = new TextEncoder().encode(process.env.JWT_KEY);

const alg = "HS256";
const createToken = async (email: string, userId: number) => {
  return await new SignJWT({ email, userId, isAdmin: true })
    .setProtectedHeader({ alg })
    .setExpirationTime("48h")
    .sign(scret);
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Email and password",
        },
        {
          status: 404,
        }
      );
    } else {
      const token = await createToken(user.email, user.id);

      cookies().set("access_token", token);
      return NextResponse.json({
        userInfo: {
          idUser: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "An unexpected error occured",
      },
      { status: 500 }
    );
  }
}
