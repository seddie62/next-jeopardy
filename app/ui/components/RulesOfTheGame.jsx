import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
const RulesOfTheGame = ({categories, isOpen, setIsOpen}) => {
  const onClose = () => {
    setIsOpen(false); // Close modal
  };
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
          <div className="p-6">
            <h2 class="text-center font-bold text-2xl font-marker">Rules of the Game</h2>
            <ul className="list-disc px-8 mt-6 space-y-2">
              <li>
                There are {categories.length} categories.
                <br />
                {categories.map(cat => (
                  cat.name
                )).join(', ')}
              </li>
              <li>Each category has 5 levels of increasing difficulty.</li>
              <li>Each group would pick a category and a level (eg. Music 100 ).</li>
              <li>
                If the question is answered correctly, the group gets a 100 points.
              </li>
              <li>
                BUT if the question is answered wrongly, the group loses 100 points
              </li>
              <li>
                The question would then be passed to another group for half the
                points, with a deduction of half marks for a wrong answer. The group
                can pass it on without any penalty
              </li>
              <li>
                You are supposed to attempt all questions your group selects. Not
                answering at all means your group loses the marks
              </li>
            </ul>
          </div>
        </ModalContent>
    </Modal>
   );
}

export default RulesOfTheGame;
