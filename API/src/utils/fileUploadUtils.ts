import multer from "multer";
import path from "path";


class fileUploadService {

    private limit = { fileSize: 15 * 1024 * 1024, fields: 30 };
    private storage = multer.diskStorage({
        destination: function (req: Request | any, res: Response | any, next: CallableFunction | any) {
            next(null, path.join(__dirname, "../../uploads"));
        },
        filename: function (req: Request | any, file: any, next: CallableFunction | any) {
            // Commented as client wants shorter name 
            // next(null, `${new Date().getTime()}-${req.params.email}-${file.originalname}`);
            next(null, `${file.originalname}`);
        }
    })


    public singleFile(fileName: string) {
        return multer({ storage: this.storage, limits: this.limit }).single(fileName);
    }

}

export default new fileUploadService();