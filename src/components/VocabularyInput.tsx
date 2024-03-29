"use client"

import { FC } from "react"
import Image from "next/image"
import { Button } from "@/src/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { json as jsonLang } from "@codemirror/lang-json"
import CodeMirror from "@uiw/react-codemirror"
import { Info } from "lucide-react"

import CreatePopup from "./CreatePopup"

interface VocabularyInputProps {
  formatJson: (_: any, spaces?: number) => void
  code: string
  setCode: (code: string) => void
  currentTheme: any
  errorMessage: string
}

const extensions = [jsonLang()]

const VocabularyInput: FC<VocabularyInputProps> = ({
  formatJson,
  code,
  setCode,
  currentTheme,
  errorMessage,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-x-4">
        <Button type="button" variant="secondary" onClick={formatJson}>
          Format
        </Button>
        <CreatePopup />
      </div>
      <div className="box-border overflow-hidden rounded-md border outline-border">
        <CodeMirror
          value={code}
          extensions={extensions}
          height="450px"
          onChange={(value) => setCode(value)}
          theme={currentTheme}
          style={{
            borderRadius: "8px",
            WebkitBorderRadius: "8px",
          }}
        />
        <div className="relative">
          <div className="absolute bottom-0 left-0 -mb-2 h-16 w-16">
            <Image
              src={"/gifs/loading-2.gif"}
              fill
              alt=""
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="">
          <pre className="bg-destructive">{errorMessage}</pre>
        </div>
      )}
    </div>
  )
}

export default VocabularyInput

/* 
TODO: 
import CodeMirror from '@uiw/react-codemirror';
import { historyField } from '@codemirror/commands';

// When custom fields should be serialized, you can pass them in as an object mapping property names to fields.
// See [toJSON](https://codemirror.net/docs/ref/#state.EditorState.toJSON) documentation for more details
const stateFields = { history: historyField };

export function EditorWithInitialState() {
  const serializedState = localStorage.getItem('myEditorState');
  const value = localStorage.getItem('myValue') || '';

  return (
    <CodeMirror
      value={value}
      initialState={
        serializedState
          ? {
              json: JSON.parse(serializedState || ''),
              fields: stateFields,
            }
          : undefined
      }
      onChange={(value, viewUpdate) => {
        localStorage.setItem('myValue', value);

        const state = viewUpdate.state.toJSON(stateFields);
        localStorage.setItem('myEditorState', JSON.stringify(state));
      }}
    />
  );
}


*/
