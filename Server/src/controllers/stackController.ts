import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Stack from '../models/stackSchema';
import ADMIN from '../utils/adminCRUD';


//STACK CONTROLLER FUNCTION

/* View All Stack */
export const viewAllStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const stacks = await ADMIN.viewAllStack();
    if (stacks) {
        res.status(200).json(stacks);
        return
    }
})
/* Create Stack Contoller */
export const addStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const stack = await ADMIN.addStack(data);
    if (stack) {
        res.status(201).json(stack);
        return
    }
})

/* Edit Stack */
export const editStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const update = req.body;
    const stackToEdit = await ADMIN.editStack(id, update);
    if (stackToEdit) {
        res.status(201).json(stackToEdit);
        return
    }
})

/* Delete Stack */
export const deleteStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const stackToDelete = await ADMIN.deleteStack(id);
    if (stackToDelete) {
        res.status(201).json(stackToDelete);
        return
    }
})