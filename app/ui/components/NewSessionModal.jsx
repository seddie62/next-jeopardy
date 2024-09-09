
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import FunkyButton from './FunkyButton'
import { useState } from "react";
import { Button as UButton } from "@nextui-org/button";
import db from '../../../utils/firestore';
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { randUuid } from '@ngneat/falso';

const NewSessionModal = () => {
    const router = useRouter()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [form, setForm] = useState({ name: '', code: '', categories: [] });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCreate = (e) => {
        e.preventDefault()
        onOpen()
    }

    const handleSubmit = async () => {

        try {
            const docRef = await addDoc(collection(db, "jeopardy-sessions"), form);
            console.log("Document written with ID: ", docRef.id);
            router.push(`/sessions/${form.code}`)
            onClose()
            setForm({ name: '', code:'' }); // Clear the form

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const generateCode = (e) => {
        e.preventDefault()
        const code = randUuid().slice(0,4).toUpperCase()
        setForm({ ...form, code })
    }

    return (
        <>
            <FunkyButton onClick={handleCreate} color="#0FF0FC">Create New Session</FunkyButton>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="font-sans">
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-sans font-bold">
                                New Session
                            </ModalHeader>
                            <ModalBody>
                                <form>
                                    <label className="text-black-500 font-normal flex flex-col space-y-2" htmlFor="name">
                                        Name
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
                                            placeholder="Eg. Sunday Quiz"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label className="text-black-500 font-normal flex flex-col space-y-2 mt-6" htmlFor="code">
                                        Code
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="code"
                                                id="code"
                                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 font-normal shadow-card"
                                                placeholder="Eg CV45"
                                                required
                                                value={form.code}
                                                onChange={handleChange}
                                            />
                                            <button onClick={generateCode} className="absolute bg-gray-300 rounded-full py-1 px-2 text-sm right-2 font-light top-4">
                                                generate code
                                            </button>
                                        </div>
                                    </label>
                                </form>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <UButton color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </UButton>
                                <UButton onPress={handleSubmit}>
                                    Save
                                </UButton>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </>
    );
}

export default NewSessionModal;
