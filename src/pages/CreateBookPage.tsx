import { useState } from "react";
import { useCreateBookMutation } from "@/features/books/booksApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function CreateBookPage() {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.genre) {
      toast.error("Please select a genre");
      return;
    }

    try {
      await createBook(form).unwrap();
      toast.success("Book created successfully!");
      setForm({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 1,
      });
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to create book. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white rounded-lg shadow-md mt-6">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="text-lg"
        />
        <Input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="text-lg"
        />

        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <Input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="text-lg"
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="text-lg"
        />
        <Input
          type="number"
          name="copies"
          value={form.copies}
          onChange={handleChange}
          min={0}
          placeholder="Copies"
          required
          className="text-lg"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-lg font-semibold"
        >
          {isLoading ? "Creating..." : "Create Book"}
        </Button>
      </form>
    </div>
  );
}
