import { SparklesIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { getPinAddress } from "./utils/mapUtils";

export function Popup({
  location,
}: {
  location: { lat: number; lng: number };
}) {
  const [propertyValue, setPropertyValue] = useState(
    "...Waiting for AI for Estimation"
  );

  async function getAIEstimation() {
    const vals = await getPinAddress({ lat: location.lat, lng: location.lng });
    if (vals)
      try {
        const res = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3.2", // Adjust based on your model
            prompt: `Give absolute property estimation for 3 bedroom residential appartment with 119m2  for this property: ${JSON.stringify(
              vals
            )}
        please keep your answer in 1 sentence, and consider it was built in 1906
        `,
            stream: true, // Enable streaming if supported by API
          }),
        });

        if (res) {
          setPropertyValue("");

          if (!res.body) {
            return;
          }
          const reader = res.body?.getReader(); // Get the reader from the stream
          const decoder = new TextDecoder();
          let done = false;
          let partialData = "";
          while (!done) {
            if (reader) {
              const { value, done: readerDone } = await reader.read();
              done = readerDone;
              const chunkValue = decoder.decode(value, { stream: true });
              partialData += chunkValue;
              const responses = partialData.split("\n");
              responses.forEach((responseString, index) => {
                try {
                  const jsonResponse = JSON.parse(responseString);
                  setPropertyValue((prev) => prev + jsonResponse.response); // Append the response
                } catch {
                  if (index === responses.length - 1) {
                    partialData = responseString;
                  }
                }
              });
            }
          }
        }
      } catch {
        setPropertyValue("There was Some problem with fetching results");
      }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SparklesIcon onClick={() => getAIEstimation()} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>{propertyValue}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setPropertyValue("...Waiting for AI for estimation")}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
