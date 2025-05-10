import { Spinner } from "@heroui/spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner classNames={{ label: "text-foreground mt-4" }} variant="dots" />
    </div>
  );
};

export default Loading;
