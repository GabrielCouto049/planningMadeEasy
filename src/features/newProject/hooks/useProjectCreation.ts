import { useState } from "react";
import type { ProjectImage, StackType } from "@/types/generalInfoType";
import { Folder } from "lucide-react";

// I'LL HAVE TO USE USEREDUCER LATER //

export default function useProjectCreation() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<ProjectImage>({ type: "icon", icon: Folder });
    const [stack, setStack] = useState<StackType>({
        language: "",
        framework: ""
    })
    const [libs, setLibs] = useState<string[]>([]);
    const [solvedProblem, setSolvedProblem] = useState("");
    const [targetAudience, setTargetAudience] = useState("")
    

    return {
        title,
        setTitle,
        description,
        setDescription,
        image,
        setImage,
        stack,
        setStack,
        libs,
        setLibs,
        solvedProblem,
        setSolvedProblem,
        targetAudience,
        setTargetAudience
    }
}