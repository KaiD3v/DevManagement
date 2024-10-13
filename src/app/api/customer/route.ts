import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import prismaClient from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json(
      { error: "You need to specify an user!" },
      { status: 400 }
    );
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail as string,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Error while search user" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: { customerId: userId },
  });

  if (findTickets) {
    return NextResponse.json(
      { error: "This client already has an open ticket!" },
      { status: 401 }
    );
  }

  try {
    await prismaClient.customer.delete({ where: { id: userId as string } });

    return NextResponse.json(
      { message: "Cliente deletado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();
  const existingCustomer = await prismaClient.user.findUnique({
    where: { email },
  });

  if (existingCustomer) {
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
