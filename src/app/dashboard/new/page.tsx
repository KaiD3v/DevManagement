import Link from "next/link";
import { Container } from "../../../components/container";
import { BiArrowBack } from "react-icons/bi";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href={"/dashboard"}
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            <BiArrowBack size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Novos Chamados</h1>
        </div>
        <form className="flex flex-col mt-6">
          <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
          <input
            type="text"
            placeholder="Digite o nome do Chamado"
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            required
          />

          <label className="mb-1 font-medium text-lg">
            Descreva o problema:
          </label>
          <textarea
            placeholder="Descreva o problema..."
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            required
          ></textarea>
          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o Cliente
              </label>
              <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none">
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {customers.length === 0 && (
            <Link href={"/dashboard/customer/new"}>
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-blue-500">Cadastrar Cliente</span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded my-4 disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
