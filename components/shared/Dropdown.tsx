import React from "react";
import { useState, useEffect, startTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ICategory } from "@/lib/database/models/category.models";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createCategory } from "@/lib/actions/category.actions";
import { getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory.trim() }).then((category) => {
      setCategories((prev) => [...prev, category]);
    });
  };

  useEffect(() => {
    // fetch all categories async function
    const getCategories = async () => {
      // use the getAllCategories function to fetch all categories into a variable called categoryList
      const categoryList = await getAllCategories();
      // if categoryList exists set the categories state to the categoryList
      categoryList && setCategories(categoryList as ICategory[]);
      // invoke the getCategories function
      getCategories();
    };
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className='select-item p-regular-14'
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className='p-medium-14 w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  placeholder='Category name'
                  type='text'
                  className='input-field mt-3'
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
