import toast from "react-hot-toast";

export const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      toast.error('Unable to copy text: ', err);
    }
};