"use client";

import { CustomerProps } from "../../../../../utils/customer.type";
import { api } from "../../../../../lib/api";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  async function handleDeleteCutomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: { id: customer.id },
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
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
      <button
        onClick={handleDeleteCutomer}
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
      >
        Deletar
      </button>
    </article>
  );
}
