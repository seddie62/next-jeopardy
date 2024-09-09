import { useState } from "react";
import AddEditCategory from "./AddEditCategory";
import FunkyButton from "./FunkyButton";
import AddEditQuestion from "./AddEditQuestion";
import ShowQuestion from "./ShowQuestion";
import { Button } from "@nextui-org/button";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai"
import db from '../../../utils/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import RulesOfTheGame from "./RulesOfTheGame";

const CategoryRow = ({ category, addQuestion, showQuestion, editMode, deleteQuestion, editQuestion }) => (
  <div className="space-y-4 flex-1 flex flex-col items-center">
    <div className="h-1/6 w-full bg-primary text-white flex justify-center items-center">
      <h1 className="font-bold text-2xl">{category.name}</h1>
    </div>
    {category.questions?.length > 0 ? (
      category.questions.sort((a, b) => (a.points - b.points)).map((question, index) => (
        <QuestionCard editQuestion={editQuestion} category={category} deleteQuestion={deleteQuestion} editMode={editMode} showQuestion={showQuestion} key={`question-${index}`} question={question} />
      ))
    ) : (
      <p className="text-center text-xs px-2">No questions found for this category.</p>
    )}
    {editMode && <Button variant="bordered" onClick={() => addQuestion(category)} color="light">
      Add Question
    </Button>
    }
  </div>
);

const QuestionCard = ({ question, showQuestion, editMode, deleteQuestion, editQuestion, category }) => (
  <div className="h-1/6 relative w-full">
    {editMode &&
      <div className="absolute right-2 top-2">
        <Button color="warning" size="sm" variant="light" onClick={()=> editQuestion(category, question) } isIconOnly> <AiFillEdit className="w-4 h-4" /></Button>
        <Button size="sm" onClick={() => deleteQuestion(category, question)} color="warning" variant="light" isIconOnly><AiOutlineDelete className="w-4 h-4" /></Button>
      </div>
    }
    <button onClick={() => showQuestion(question)} className={`${question.read && "red"} h-full  w-full bg-primary text-white flex items-center justify-center`}>

      {!question.read && <p className="text-3xl font-marker">{question.points} points</p>}
    </button>
  </div>
);

const SessionDetails = ({ session, refresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
  const [isQuestionShowOpen, setIsQuestionShowOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const router = useRouter()

  const limit = 5

  const createCategory = () => {
    setIsOpen(true); // Opens the modal when this function is called
  };

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const addQuestion = (category) => {
    setCurrentCategory(category); // Opens the modal when this function is called
    setIsEditQuestionOpen(true)
  };

  const goHome = () => {
    router.push('/')
  }

  const resetGame = async () => {
    const categories = session.categories || []

    categories.forEach(category => {
      category.questions.forEach(question => {
        question.read = false
      });
    });

    const ref = doc(db, "jeopardy-sessions", session.id);

    await updateDoc(ref, {
        categories: session.categories,
    });
    refresh()
  }

  const deleteQuestion = async (category, question) => {
    const index = category.questions.findIndex(a => a.id === question.id)



    if (index !== -1) {
      session.categories = session.categories.map(cat => {
        if (cat.id === category.id) {
          cat.questions = cat.questions.filter(q => q.id !== question.id)



        }
        return cat
      })

    }

    const ref = doc(db, "jeopardy-sessions", session.id);

    await updateDoc(ref, {
        categories: session.categories,
    });

    refresh()
  };

  const editQuestion = (category, question) => {
    setCurrentCategory(category)
    setCurrentQuestion(question); // Opens the modal when this function is called
    setIsEditQuestionOpen(true)
  };

  const showQuestion = (question) => {
    setCurrentQuestion(question); // Opens the modal when this function is called
    setIsQuestionShowOpen(true)
  };

  return (
    <div className="h-screen w-full bg-black text-white">
      {session.categories?.length > 0 ? (
        <div className="flex h-full flex-col">
          <div className={`grid grid-cols-${session.categories.length + (session.categories.length <= limit ? 1 : 0)} gap-4 flex-1`}>
            {session.categories.map((category, index) => (
                <CategoryRow editQuestion={editQuestion} deleteQuestion={deleteQuestion} editMode={editMode} showQuestion={showQuestion} addQuestion={addQuestion} key={`category-${index}`} category={category} />
            ))}
            { session.categories.length <= limit && editMode && <div className="h-1/6 flex items-center justify-center">
              <FunkyButton onClick={() => setIsOpen(true)} color="#8A2BE2">
                Add Category
              </FunkyButton>
            </div>
            }
          </div>
          {/* buttons */}
          <div className="flex justify-end space-x-2">
            <Button radius="none" color="primary" onClick={() => setIsRulesOpen(true)}>Rules of the game</Button>
            <Button radius="none" color="primary" onClick={() => resetGame()}>Reset Game</Button>
            <Button radius="none" color="primary" onClick={() => toggleEditMode()}>{editMode ? 'View' : 'Edit'} Mode</Button>
            <Button radius="none" color="primary" onClick={() => goHome()}>Back to Home</Button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center space-y-4">
          <p>No categories found for this session.</p>
          {/* Correctly handle the button click */}
          <div className="flex gap-4">
            <FunkyButton onClick={() => setIsOpen(true)} color="#8A2BE2">
              Add Category
            </FunkyButton>
            <FunkyButton onClick={() => goHome()} color="#0FF0FC">
              Back to Home
            </FunkyButton>
          </div>
        </div>
      )}
      {/* Modal for adding/editing category */}
      <AddEditCategory isOpen={isOpen} id={session.id} setIsOpen={setIsOpen} categories={session.categories} />
      {/* Modal for adding/editing question */}
      <AddEditQuestion question={currentQuestion} isOpen={isEditQuestionOpen} id={session.id} setIsOpen={setIsEditQuestionOpen} categories={session.categories} category={currentCategory} />

      <ShowQuestion question={currentQuestion} isOpen={isQuestionShowOpen} setIsOpen={setIsQuestionShowOpen} />

      <RulesOfTheGame isOpen={isRulesOpen} setIsOpen={setIsRulesOpen} categories={session.categories} />
    </div>
  );
};

export default SessionDetails;
