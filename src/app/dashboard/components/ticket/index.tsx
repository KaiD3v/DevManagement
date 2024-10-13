"use client";

import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";
import { TicketProps } from "../../../../utils/ticket.type";
import { CustomerProps } from "../../../../utils/customer.type";
import { api } from "../../../../lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "../../../../providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer,
      ticket,
    });
  }

  return (
    <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
      <td className="text-left pl-1">{customer?.name}</td>
      <td className="text-left hidden sm:table-cell">
        {ticket.created_at?.toLocaleDateString("pt-br")}
      </td>
      <td className="text-left">
        <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
      </td>
      <td className="text-left">
        <button onClick={handleChangeStatus} className="mr-3">
          <FiCheckSquare size={24} color="#131313" />
        </button>
        <button onClick={handleOpenModal}>
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
  );
}
