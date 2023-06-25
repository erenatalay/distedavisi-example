import  * as dotenv  from "dotenv";
import  connetDataBase  from "./connection";

export default  () => {
    dotenv.config();
    connetDataBase.connetDataBase();

}