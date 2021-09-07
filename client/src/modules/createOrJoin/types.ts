import { CodeLen, MaxNameLen } from "@connect-game/shared"
import * as yup from "yup"

export interface JoinForm {
  code: string
  name: string
}

export const JoinFormSchema = yup.object({
  code: yup.string().length(CodeLen).uppercase(),
  name: yup.string().max(MaxNameLen),
})
