import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import QuestionForm from "./QuestionForm";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai"
import db from '../../../utils/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { randUuid } from '@ngneat/falso';


export default function AddEditCategory({ category, isOpen, setIsOpen, id, categories }) {
  const [form, setForm] = useState({ name: '', questions: [], id: randUuid() });
  const [isLoading, setIsLoading] = useState(false);

  const defaultQuestion = { points: 100, question: '', answer: '', read: false }

  // Close Modal Function
  const onClose = () => {
    setIsOpen(false); // Close modal
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to update a specific question in the questions array
  const setQuestion = (index, updatedQuestion) => {
    const updatedQuestions = form.questions.map((q, i) => (i === index ? updatedQuestion : q));
    setForm({ ...form, questions: updatedQuestions });
  };

  const addQuestion = () => {
    const newQuestions = form.questions || []
    newQuestions.push({...defaultQuestion, id: randUuid()})
    setForm({ ...form, questions: newQuestions });
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...form.questions]; // Create a shallow copy of the questions array
    newQuestions.splice(index, 1); // Remove the question at the given index
    setForm({ ...form, questions: newQuestions }); // Update the state with the new array
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const ref = doc(db, "jeopardy-sessions", id);
      const newCategories = categories || []
      newCategories.push({...form})

       await updateDoc(ref, {
        categories: newCategories,
      });
      onClose()
      setForm({ name: '', questions: [], read: false }); // Clear the form
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
          {category ? `Edit ${category.name}` : 'Add'} Category
        </ModalHeader>
        <ModalBody>
          <form className="space-y-6">
            <label className="text-black-500 font-normal flex flex-col space-y-2" htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                id="name"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
                placeholder="Eg. Category 1"
                required
                value={form.name}
                onChange={handleChange}
              />
            </label>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p>Questions </p>

                <Button color="primary" variant="light" onClick={addQuestion} isIconOnly> <AiFillPlusCircle className="w-6 h-6" /></Button>
              </div>

              <div className="space-y-4">
                {form.questions?.length ? form.questions.map((question, index) => (
                  <div className="flex w-full space-x-2 items-start" key={index}>
                    <p>{index+1}</p>
                    <QuestionForm className="flex-1" question={question} setQuestion={(updatedQuestion) => setQuestion(index, updatedQuestion)}  />
                    <Button onClick={() => deleteQuestion(index)} color="primary" variant="light" isIconOnly><AiOutlineDelete className="w-6 h-6" /></Button>
                  </div>
                )) :
                (
                  <p className="text-center text-sm">There are no questions for this category</p>
                )}
              </div>
            </div>
          </form>
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
