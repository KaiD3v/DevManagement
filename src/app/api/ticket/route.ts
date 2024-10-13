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
