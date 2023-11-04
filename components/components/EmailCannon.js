
import { Label } from "@components/components/ui/label"
import { Button } from "@components/components/ui/button"
import { CardFooter, CardContent, Card } from "@components/components/ui/card"

const EmailCannon = () => {
  return (
    (<Card
      className="w-full max-w-xl mx-auto mt-10 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-10">
        <div className="flex items-center justify-center">
          <img
            alt="Email Cannon"
            height="250"
            src="/placeholder.svg"
            style={{
              aspectRatio: "250/250",
              objectFit: "cover",
            }}
            width="250" />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center">Email Cannon</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-center mt-2">Upload a CSV file to send mass emails</p>
        </div>
        <div className="mt-6">
          <Label className="sr-only" htmlFor="csvFile">
            CSV File
          </Label>
          <div
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className=" mx-auto h-12 w-12 text-gray-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <Button className="focus:outline-none" variant="outline">
                  <span>Upload a file</span>
                  <input className="sr-only" id="csvFile" name="csvFile" type="file" />
                </Button>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">CSV up to 10MB</p>
            </div>
          </div>
        </div>
        <CardFooter className="mt-6">
          <Button className="w-full" type="submit">
            Launch
          </Button>
        </CardFooter>
      </CardContent>
    </Card>)
  );
}

export default EmailCannon;