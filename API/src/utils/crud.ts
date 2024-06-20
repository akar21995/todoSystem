import { Model } from "mongoose";

class CrudOperations {

    private dbModel: Model<any>; 

    constructor(dbModel: Model<any>) {
        this.dbModel = dbModel;
    }

    createOneDocument(obj: Record<string, any>): Promise<any> {
        const model =  new this.dbModel(obj);
        return model.save(obj);
    }

    createManyDocuments(docs: any[]): Promise<any[]> {
        return this.dbModel.insertMany(docs);
    }


    getDocument(query: any, projections: any): Promise<any> {
        return this.dbModel.findOne(query, projections);
    }


    getAllDocuments(query: any, projections: any): Promise<any> {
        return this.dbModel.find(query, projections).lean();
    }

    countAllDocuments(query: any): Promise<any> {
        return this.dbModel.countDocuments(query).lean();
    }


    updateDocument(query: any, doc: any): Promise<any> {
        return this.dbModel.findOneAndUpdate(query, { $set: doc }, { new: true, runValidators: true }).lean();
    }


    deleteDocument(query: any): Promise<any> {
        return this.dbModel.deleteOne(query);
    }

}

export default CrudOperations;