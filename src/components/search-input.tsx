import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

interface PropsSearchIcon {
  className: string | "";
}

export const SearchIcon: React.FC<PropsSearchIcon> = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className={className}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const SearchInput = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useNavigate();

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant="flat">
        {" "}
        <SearchIcon className="mb-0.5 pointer-events-none flex-shrink-0" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cari Drama
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Type to search..."
                  type="text"
                  variant="faded"
                  size="md"
                  isRequired
                  isClearable
                  ref={searchRef}
                  errorMessage="Please enter a valid title"
                  startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    router(`/${slugify(searchRef.current?.value)}`)
                  }
                >
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchInput;
