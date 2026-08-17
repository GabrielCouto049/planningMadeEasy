import { useState } from "react";

export default function useProjectCreation() {
    const [title, setTitle] = useState("")

    return {
        title,
        setTitle,
    }
}