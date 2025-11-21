// Lucide icons
import { Send, Paperclip, X, FileText, File, Smile } from "lucide-react";

// Hooks
import { useRef, useState, useEffect } from "react";

// Stores
import { useChatStore } from "../../stores/useChatStore";
import { toast } from "react-toastify";

// File Helpers
import { formatFileSize } from "../../utils/fileHelpers";

// Emoji Picker
import EmojiPicker from "emoji-picker-react";

const SendMessage = () => {
  const { sendMessage, isSendingMessage } = useChatStore();
  const selectFileRef = useRef();
  const textareaRef = useRef();
  const emojiPickerRef = useRef();
  const [message, setMessage] = useState({
    text: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Close emoji picker when clicking outside and handle scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    // Prevent page scroll when scrolling inside emoji picker
    const handleWheel = (e) => {
      if (showEmojiPicker && emojiPickerRef.current?.contains(e.target)) {
        e.stopPropagation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [showEmojiPicker]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120); // Max 120px
      textareaRef.current.style.height = `${newHeight}px`;

      // Show scroll only when at max height
      if (textareaRef.current.scrollHeight > 120) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [message.text]);

  const getFileIcon = (file) => {
    if (file.type.includes("word")) {
      return <FileText className="size-4" />;
    } else if (
      file.type.includes("excel") ||
      file.type.includes("spreadsheet")
    ) {
      return <FileText className="size-4" />;
    } else if (
      file.type.includes("powerpoint") ||
      file.type.includes("presentation")
    ) {
      return <FileText className="size-4" />;
    } else if (file.type === "application/pdf") {
      return <FileText className="size-4" />;
    } else {
      return <File className="size-4" />;
    }
  };

  // Allowed file types
  const allowedTypes = {
    images: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ],
    documents: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/pdf",
      "text/plain",
    ],
  };

  const allAllowedTypes = [...allowedTypes.images, ...allowedTypes.documents];

  const handleSelectFiles = (files) => {
    const fileArray = Array.from(files);

    // Filter files by allowed types and size
    const validFiles = fileArray.filter((file) => {
      if (!allAllowedTypes.includes(file.type)) {
        toast.error(`File type not supported: ${file.name}`);
        return false;
      }

      if (file.size / (1024 * 1024) > 10) {
        toast.error(`File size exceeds 10MB: ${file.name}`);
        return false;
      }

      return true;
    });

    // Create preview URLs for images
    const filesWithPreviews = validFiles.map((file) => {
      if (allowedTypes.images.includes(file.type)) {
        return {
          file,
          preview: URL.createObjectURL(file),
          isImage: true,
          uploadProgress: 0,
        };
      } else {
        return {
          file,
          preview: null,
          isImage: false,
          uploadProgress: 0,
        };
      }
    });

    if (filesWithPreviews.length > 0) {
      setSelectedFiles((prev) => [...prev, ...filesWithPreviews]);
    }

    // Reset input value to allow selecting same files again
    if (selectFileRef.current) {
      selectFileRef.current.value = "";
    }
  };

  const handleRemoveFile = (index) => {
    // Revoke object URL to prevent memory leaks
    if (selectedFiles[index].preview) {
      URL.revokeObjectURL(selectedFiles[index].preview);
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Convert file to base64 for server upload
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();

    if (
      (!message.text.trim() && selectedFiles.length === 0) ||
      uploading ||
      isSendingMessage
    ) {
      return;
    }

    setUploading(true);
    setShowEmojiPicker(false); // Close emoji picker when sending

    try {
      // Convert files to base64 for server upload
      const fileAttachments = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const item = selectedFiles[i];
        try {
          const base64 = await fileToBase64(item.file);
          fileAttachments.push({
            name: item.file.name,
            type: item.file.type,
            size: item.file.size,
            data: base64, // Base64 encoded file data
            isImage: item.isImage,
          });

          // Update progress
          setSelectedFiles((prev) =>
            prev.map((file, index) =>
              index === i ? { ...file, uploadProgress: 100 } : file
            )
          );
        } catch (error) {
          console.error(`Failed to process ${item.file.name}:`, error);
          toast.error(`Failed to process ${item.file.name}`);
          setUploading(false);
          return;
        }
      }

      // Prepare message with file data (server will handle upload)
      const messageToSend = {
        text: message.text, // Keep the newlines intact
        attachments: fileAttachments, // Array of files as base64
      };

      console.log("Sending message with attachments:", messageToSend);

      // Send message through your existing store
      await sendMessage(messageToSend);

      // Clear everything and revoke URLs
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setMessage({ text: "" });
      setSelectedFiles([]);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.overflowY = "hidden";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setUploading(false);
    }
  };

  const closeAllFiles = () => {
    // Revoke all object URLs
    selectedFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setSelectedFiles([]);
  };

  const handleEmojiSelect = (emojiData) => {
    setMessage((prev) => ({
      ...prev,
      text: prev.text + emojiData.emoji,
    }));
    // Focus back to textarea after emoji selection
    textareaRef.current?.focus();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    // Enter sends message, Shift+Enter creates new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Shift+Enter will naturally create a new line in textarea
  };

  const isSendDisabled =
    (!message.text.trim() && selectedFiles.length === 0) ||
    uploading ||
    isSendingMessage;

  return (
    <div className="p-3 bg-[var(--panel-blue)] border-t border-[var(--card-blue)]">
      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--accent-yellow)]">
              Selected Files ({selectedFiles.length})
              {(uploading || isSendingMessage) && (
                <span className="ml-2 text-[var(--muted-gray)] text-xs">
                  {uploading ? "Processing..." : "Sending..."}
                </span>
              )}
            </span>
            <button
              onClick={closeAllFiles}
              disabled={uploading}
              className="text-xs text-[var(--muted-gray)] hover:text-white disabled:opacity-50 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[var(--card-blue)] scrollbar-track-transparent">
            {selectedFiles.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-[var(--card-blue)] rounded-lg border border-[var(--panel-blue)] p-2 w-32 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-[var(--accent-yellow)]"
              >
                {/* Image Preview or Document Icon */}
                {item.isImage ? (
                  <div className="relative w-full h-24 mb-2">
                    <img
                      src={item.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md border border-[var(--panel-blue)]"
                    />
                    <button
                      onClick={() => handleRemoveFile(index)}
                      disabled={uploading}
                      className="absolute -top-2 -right-2 bg-[var(--accent-yellow)] text-[var(--bg-dark)] rounded-full p-1 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 shadow-lg"
                      title="Remove file"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-24 mb-2 flex items-center justify-center bg-[var(--panel-blue)] rounded-md border border-[var(--panel-blue)]">
                    <div className="text-[var(--accent-yellow)]">
                      {getFileIcon(item.file)}
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      disabled={uploading}
                      className="absolute -top-2 -right-2 bg-[var(--accent-yellow)] text-[var(--bg-dark)] rounded-full p-1 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 shadow-lg"
                      title="Remove file"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-medium text-white truncate"
                    title={item.file.name}
                  >
                    {item.file.name}
                  </div>
                  <div className="text-xs text-[var(--muted-gray)]">
                    {formatFileSize(item.file.size)}
                  </div>
                  {item.uploadProgress > 0 && (
                    <div className="w-full bg-[var(--panel-blue)] rounded-full h-1 mt-1">
                      <div
                        className="bg-[var(--accent-yellow)] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${item.uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        {/* Emoji Picker - FIXED: Added scroll prevention */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-full right-0 mb-2 z-10 hidden md:block overflow-hidden"
            onWheel={(e) => e.stopPropagation()} // Prevent wheel event propagation
          >
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              theme="dark"
              height={400}
              width={350}
              searchDisabled={false}
              skinTonesDisabled={true}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-start gap-2">
          <div className="relative flex-grow">
            <textarea
              ref={textareaRef}
              value={message.text}
              placeholder="Send a message..."
              disabled={uploading}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
              rows={1}
              className="w-full px-4 py-2 rounded-lg bg-[var(--card-blue)] border border-[var(--panel-blue)] text-white placeholder-[var(--muted-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all duration-200 disabled:opacity-50 resize-none min-h-[40px] scrollbar-thin scrollbar-thumb-[var(--panel-blue)] scrollbar-track-[var(--card-blue)]"
              style={{ overflowY: "hidden" }}
            />
          </div>

          <input
            ref={selectFileRef}
            onChange={(e) => handleSelectFiles(e.target.files)}
            type="file"
            multiple
            disabled={uploading}
            accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt"
            className="hidden"
          />

          {/* Emoji Button - Hidden on mobile, visible on desktop */}
          <button
            type="button"
            onClick={toggleEmojiPicker}
            disabled={uploading}
            className="p-2 rounded-full bg-[var(--card-blue)] hover:bg-[var(--accent-yellow)] hover:text-[var(--bg-dark)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] border border-[var(--panel-blue)] disabled:opacity-50 disabled:hover:bg-[var(--card-blue)] disabled:hover:text-[var(--muted-gray)] hidden md:flex mt-1"
            title="Add emoji"
          >
            <Smile className="size-5 text-[var(--muted-gray)] hover:text-[var(--bg-dark)] transition-colors" />
          </button>

          <button
            onClick={() => selectFileRef.current?.click()}
            type="button"
            disabled={uploading}
            className="p-2 rounded-full bg-[var(--card-blue)] hover:bg-[var(--accent-yellow)] hover:text-[var(--bg-dark)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] border border-[var(--panel-blue)] disabled:opacity-50 disabled:hover:bg-[var(--card-blue)] disabled:hover:text-[var(--muted-gray)] mt-1"
            title="Attach files"
          >
            <Paperclip className="size-5 text-[var(--muted-gray)] hover:text-[var(--bg-dark)] transition-colors" />
          </button>

          <button
            disabled={isSendDisabled}
            type="submit"
            className="p-2 rounded-full bg-[var(--accent-yellow)] text-[var(--bg-dark)] hover:bg-yellow-300 disabled:bg-[var(--card-blue)] disabled:text-[var(--muted-gray)] disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-lg hover:shadow-xl mt-1"
            title="Send message"
          >
            {uploading || isSendingMessage ? (
              <div className="size-5 border-2 border-[var(--bg-dark)] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
