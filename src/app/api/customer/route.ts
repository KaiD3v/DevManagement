import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { error } from "console";
import prismaClient from "../../../lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();
  const existingUser = await prismaClient.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: "Este e-mail já existe!" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.create({
      data: { name, email, phone, address: address ? address : "", userId },
    });

    return NextResponse.json(
      { message: "Cliente cadastro com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error while register new customer" },
      { status: 501 }
    );
  }
}
