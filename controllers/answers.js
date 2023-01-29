import mongoose from "mongoose";
import Question from "../models/questions.js";

export const postAnswer = async (req,res)=>{
    const {id: _id} = req.params
    const {noOfAnswers, answerBody, userAnswered, userId } = req.body
    console.log(_id, noOfAnswers, answerBody, userAnswered )
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question not available')
    }

    updateNoOfAnswer(_id, noOfAnswers)
    
    try {
        const updateQuestion = await Question.findByIdAndUpdate(_id, {$addToSet: {'answer': [{answerBody, userAnswered, userId}]}})
        res.status(200).json(updateQuestion)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: message})
    }
}

const updateNoOfAnswer = async (_id, noOfAnswers) =>{
    try {
        await Question.findByIdAndUpdate(_id, {$set: {'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error)        
    }
}

export const deleteAnswer = async (req,res) =>{
    const {id: _id} = req.params
    const {noOfAnswers, answerId} = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question not available')
    }

    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer not available')
    }

    updateNoOfAnswer(_id, noOfAnswers)

    try {
        await Question.updateOne({_id}, {$pull: {'answer': {_id: answerId}}})
        res.status(200).json({message: "Answer deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(405).json(error)
    }

}