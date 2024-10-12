import Link from "next/link";
import { Container } from "../../../components/container";
import { BiArrowBack } from "react-icons/bi";

export default function NewTicket() {
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
          <label className="mb-1 font-medium text-lg">
            Selecione o Cliente
          </label>
          <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none">
            <option value="Cliente1">Cliente 1</option>
          </select>
        </form>
      </main>
    </Container>
  );
}
