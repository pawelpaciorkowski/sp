import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAlerts } from "../../../../_hooks/alerts";
import { FileEarmark, FileEarmarkFill, XCircleFill } from "react-bootstrap-icons";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const focusedStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

export default function FileCollectionField({ field, disabled, saveCollection }: any) {
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const { addAlert } = useAlerts();
    const fileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("No file selected");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event: any) => {
                const base64 = event.target.result;
                resolve(base64);
            };

            reader.onerror = (error) => {
                reject("Error reading the file: " + error);
            };
        });
    };

    const removeFile = (fileName: string) => {
        setSelectedFiles(
            selectedFiles.filter((file: any) => file.filename !== fileName)
        );
    };

    useEffect(() => {
        setSelectedFiles([])
    }, [field.name])

    useEffect(() => {
        if (saveCollection) saveCollection(field.name, selectedFiles);
    }, [selectedFiles, field.name, saveCollection]);

    const onDrop = useCallback(
        async (acceptedFiles: any[]) => {
            const handleAddFiles = (files: any[]) => {
                const updatedArray = selectedFiles.map((existFile: any) => {
                    const matchingFile = files.find(
                        (newFile) => newFile.filename === existFile.filename
                    );
                    if (matchingFile) {
                        addAlert(
                            "warning",
                            `Plik ${matchingFile.filename} jest już istnieje, nadpisuje`
                        );
                        return matchingFile;
                    }
                    return existFile;
                });
                const newItems = files.filter(
                    (newFile) =>
                        !selectedFiles.some(
                            (existFile: any) =>
                                existFile.filename === newFile.filename
                        )
                );
                updatedArray.push(...newItems);
                setSelectedFiles(updatedArray);
            };

            const results = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const base64 = await fileToBase64(file);
                    return {
                        filename: file.name,
                        content: base64,
                    };
                })
            );
            handleAddFiles(results);
        },
        [addAlert, selectedFiles]
    );

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
            "application/pdf": [],
            "application/vnd.ms-excel": [],
            "text/csv": [],
            "application/msword": [],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [],
        },
    });

    const style: any = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    if (disabled) {
        console.log(field.value)
        const savedFiles = field.value.map((array: any) => {
            return array[0].value
        })
        return (
            <div className="mt-2 mb-2">
            Przesłane pliki
            <div className="flex flex-row">
            {savedFiles.map((savedFile: string) => 
                <div className="basis-1/4">
                    <div className="m-2 bg-primary-200 rounded p-3 flex">
                    <FileEarmarkFill className="mr-2"/> {savedFile}
                    </div>
                </div>
            )}
            </div>
            </div>
        )
    }

    return (
        <>
            <div className="mb-1">{field.label}</div>
            <div className="flex flex-row">
                {selectedFiles &&
                    selectedFiles.map((file: any, index: any) => {
                        return (
                            <div className="basis-1/3" key={index + 1}>
                                <div className="p-2 mr-2 mb-2 bg-primary-300 rounded">
                                    <div className="flex flex-row items-center">
                                        <div className="basis-3/4">
                                            <div className="flex">
                                                <FileEarmark
                                                    className="mr-1"
                                                    size={20}
                                                />
                                                {file.filename}
                                            </div>
                                        </div>
                                        <div className="basis-1/4">
                                            <XCircleFill
                                                className="float-right cursor-pointer hover:text-danger-600"
                                                onClick={() =>
                                                    removeFile(file.filename)
                                                }
                                                size={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="container">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Przeciągnij lub kliknij aby przesłać pliki</p>
                </div>
            </div>
        </>
    );
}