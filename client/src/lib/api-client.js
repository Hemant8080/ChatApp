import { HOST } from "@/utils/constant";
import axios from "axios";

export  const apiclient = axios.create({ baseURL: HOST });
