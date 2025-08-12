import { useState } from "react";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/features/books/booksApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function BooksPage() {
  const { data: books, isLoading, isError, refetch } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBorrowOpen, setIsBorrowOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const genreOptions = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const handleEdit = (book: any) => {
    setSelectedBook(book);
    setIsEditOpen(true);
  };

  const handleBorrow = (book: any) => {
    setSelectedBook(book);
    setIsBorrowOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook?._id) return;
    await updateBook({
      id: selectedBook._id,
      body: {
        title: selectedBook.title,
        author: selectedBook.author,
        genre: selectedBook.genre,
        copies: selectedBook.copies,
        isbn: selectedBook.isbn,
      },
    });
    setIsEditOpen(false);
    refetch();
  };

  const handleBorrowSubmit = async (e: React.FormEvent) => {};

  const confirmDelete = async () => {
    if (confirmDeleteId) {
      await deleteBook(confirmDeleteId);
      setConfirmDeleteId(null);
      refetch();
    }
  };

  const isAnyDialogOpen =
    isEditOpen || isBorrowOpen || confirmDeleteId !== null;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Books</h1>

      {/* Table container with blur and opacity when dialog open */}
      <div
        className={`transition-all duration-300 ${
          isAnyDialogOpen ? "opacity-50 pointer-events-none select-none" : ""
        }`}
        style={isAnyDialogOpen ? { filter: "blur(3px)" } : {}}
      >
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Genre</th>
              <th className="p-2 border">ISBN</th>
              <th className="p-2 border">Copies</th>
              <th className="p-2 border">Availability</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.data?.map((book: any) => (
              <tr key={book._id}>
                <td className="p-2 border">{book.title}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border text-center ">{book.genre}</td>
                <td className="p-2 border">{book.isbn}</td>
                <td className="p-2 border text-center">{book.copies}</td>
                <td className="p-2 border">
                  {book.copies > 0 ? (
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <span>✅</span> <span>Available</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <span>❌</span> <span>Unavailable</span>
                    </span>
                  )}
                </td>

                <td className="p-2 border flex gap-2 flex-nowrap min-w-[220px] min-h-[70px] items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDeleteId(book._id)}
                    className="text-red-500"
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    disabled={book.copies === 0}
                    onClick={() => handleBorrow(book)}
                  >
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <Input
              value={selectedBook?.title || ""}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
              placeholder="Title"
              required
            />
            <Input
              value={selectedBook?.author || ""}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, author: e.target.value })
              }
              placeholder="Author"
              required
            />
            {/* Genre dropdown */}
            <select
              value={selectedBook?.genre || ""}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, genre: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            >
              <option value="" disabled>
                Select genre
              </option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <Input
              type="number"
              value={selectedBook?.copies || 0}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  copies: parseInt(e.target.value),
                })
              }
              placeholder="Copies"
              min={0}
              required
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Borrow Dialog */}
      <Dialog open={isBorrowOpen} onOpenChange={setIsBorrowOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to borrow{" "}
            <strong>{selectedBook?.title}</strong>?
          </p>
          <DialogFooter>
            <Button
              onClick={handleBorrowSubmit}
              disabled={selectedBook?.copies === 0}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!confirmDeleteId}
        onOpenChange={() => setConfirmDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this book?</p>
          <DialogFooter>
            <Button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
