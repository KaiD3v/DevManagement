import { CustomerProps } from "../../../../../utils/customer.type";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-200">
      <h2>
        <b>Nome:</b> {customer.name}
      </h2>
      <p>
        <b>E-Mail:</b> {customer.email}
      </p>
      <p>
        <b>Telefone:</b> {customer.phone}
      </p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
}
