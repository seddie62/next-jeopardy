import { Button } from "@nextui-org/button";
import QuestionForm from "./QuestionForm";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import db from '../../../utils/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { randUuid } from '@ngneat/falso';

const AddEditQuestion = ({ categories, isOpen, setIsOpen, category, id, question }) => {
    const [form, setForm] = useState(question || { question: '', answer: '', read: false, points: 100, id: randUuid()  });
    const [isLoading, setIsLoading] = useState(false);

    const categoryPoints = category?.questions?.reduce((accumulator, currentValue) => {
        return [...accumulator, currentValue.points]
    }, []) || []

    // Use useEffect to update the form state if the `question` prop changes (for prepopulating)
    useEffect(() => {
        if (question) {
            setForm(question); // Prepopulate the form when editing an existing question
        }
    }, [question]);

    // Close Modal Function
    const onClose = () => {
        setIsOpen(false); // Close modal
    };

    const updateQuestions = (questions, newQuestion) => {
        let newQuestions = questions

        const index = questions.findIndex(a => a.id === newQuestion.id)
        if (index !== -1) {
            newQuestions = questions.map(a => {
                if (a.id === newQuestion.id) return newQuestion
                return a
            })
        } else {
            newQuestions.push(newQuestion)
        }

        return newQuestions
    }

    const handleSave = async () => {
        setIsLoading(true);
        try {
          const ref = doc(db, "jeopardy-sessions", id);
          const newCategories = categories.map(cat => {
            if (cat.id === category.id) {
                cat.questions = updateQuestions(cat.questions || [], form)
            }
            return cat
          })

        await updateDoc(ref, {
            categories: newCategories,
        });
        onClose()
        setForm({ question: '', read: false }); // Clear the form
        } catch (e) {
            console.error("Error adding document: ", e);
        } finally {
          setIsLoading(false)
        }
      };
  return (
    <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        radius="lg"
        size="3xl"
        classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
    >
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
                Add Question
            </ModalHeader>
            <ModalBody>
                <QuestionForm question={form} setQuestion={setForm} categoryPoints={categoryPoints} />
            </ModalBody>
            <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button
                    isLoading={isLoading}
                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                    onPress={handleSave}
                >
                    Save
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
   );
}

export default AddEditQuestion;
