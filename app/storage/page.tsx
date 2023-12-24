'use client';
import { NextPage } from "next"
import { ChangeEvent } from "react";
import supabase from "../supabase";

export default function Home() {
    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        let file;

        if (e.target.files) {
            file = e.target.files[0];
        }

        const { data, error } = await supabase.storage
            .from("elec_file")
            .upload("images/" + file?.name, file as File);


        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }
    }
    const handleUploadV = async (e: ChangeEvent<HTMLInputElement>) => {
        let file;

        if (e.target.files) {
            file = e.target.files[0];
        }

        const { data, error } = await supabase.storage
            .from("elec_file")
            .upload("video/" + file?.name, file as File);


        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }
    }





    return (<main>

        <div className="flex min-h-screen flex-col items-center justify-center py-2">




            <img src="https://yeufhphexqllcyvsnvsv.supabase.co/storage/v1/object/sign/elec_file/images/Screenshot%20(4).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJlbGVjX2ZpbGUvaW1hZ2VzL1NjcmVlbnNob3QgKDQpLnBuZyIsImlhdCI6MTcwMDY3MzI5OSwiZXhwIjoxNzAxMjc4MDk5fQ.oRuRUVQloMF5kZFxS2sn3GBKByNmyeqYoRXu6VESH_I&t=2023-11-22T17%3A14%3A59.262Z" />
            <video src="" />

            <input
                type="file"
                accept="image/*"
                className="block w-auto text-sm text-white bg-gray-700 rounded-lg border border-gray-800 cursor-pointer dark:text-gray-900 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800"
                id="file_input"
                onChange={(e) => { handleUpload(e); }}
            />
            <br />
            <br />
            <input
                type="file"
                accept="video/*"
                className="block w-auto text-sm text-white bg-gray-700 rounded-lg border border-gray-800 cursor-pointer dark:text-gray-900 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800"
                id="file_input"
                onChange={(e) => { handleUploadV(e); }}
            />
        </div>

    </main>)




}; 
