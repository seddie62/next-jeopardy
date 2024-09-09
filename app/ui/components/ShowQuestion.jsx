import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useState } from "react";

const ShowQuestion = ({ question, isOpen, setIsOpen }) => {
  const [show, setShow] = useState();

  const onClose = () => {
    setShow(false)
    setIsOpen(false); // Close modal
  };

  const reveal = () => {
    setShow(true)
    question.read = true
    // $store.dispatch('answerRead', { ...question, read: true })
  }

  return (
    <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        radius="lg"
        size="3xl"
        classNames={{
            body: "py-6 bg-white",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-white dark:bg-[#19172c] text-black",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
    >
        <ModalContent>
          {question && <div className="p-10 flex flex-col space-y-12">
                <h6 className="text-center font-bold text-xl">QUESTION - {question.points}</h6>
                <p className="text-center text-2xl">{ question.question }</p>

                <div className="flex flex-col items-end space-y-4">
                    <Button onClick={reveal} color="primary">Reveal answer</Button>
                    {question.read && <p className="text-primary font-bold text-xl">{ question.answer }</p> }
                </div>
            </div>
          }
        </ModalContent>
      </Modal>
  );
}

export default ShowQuestion;
