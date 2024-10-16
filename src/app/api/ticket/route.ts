import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { authOptions } from "../../../lib/auth";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: { id: id as string },
  });

  if (!findTicket) {
    return NextResponse.json({ error: "Invalid Ticket." }, { status: 404 });
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json(
      { message: "Ticket concluído com sucesso." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update ticket." },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json({ error: "Bad Request." }, { status: 401 });
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name: name,
        description: description,
        customerId: customerId,
        status: "ABERTO",
      },
    });

    return NextResponse.json(
      { message: "Ticket registrado com sucesso." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create ticket." },
      { status: 400 }
    );
  }
}
