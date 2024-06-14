'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "./db";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
    history: [], // Start with an empty history
    generationConfig: {
        maxOutputTokens: 500,
    },
});
export async function run(chatMessage) {
    try {
        
     
    
    const result = await chat.sendMessage(chatMessage);
    const response = await result.response;
    const text = await response.text();
    //console.log("AI: ", text);
    return text
    }catch (error) {
        return null;
    }
}




  
export const generateTourResponse = async ({ city, country }) => {
    console.log(city,country);
    const query = `Find a ${city} in this ${country}.
    If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be in the following JSON format: 
    {
    "tour": {
        "city": "${city}",
        "country": "${country}",
        "title": "title of the tour",
        "description": "description of the city and tour",
        "stops": ["Name of stop 1 ", "Name of stop 2","Name of stop 3"]
    }
    }
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;
    
    try {
        // const Tourchat = model.startChat({
        //     history: [], // Start with an empty history
        //     generationConfig: {
        //         maxOutputTokens: 500,
        //     },
        // });
        const result = await model.generateContent(query);
        const response = await result.response;
        const text = response.text();
        //console.log(text);
        const tourinfo=JSON.parse(text)
        if (!tourinfo.tour) {
            return null;
          }
        // console.log(tourinfo);
        // console.log(tourinfo.tour);
        
      
        return tourinfo.tour;

        
    } catch (error) {
        console.log(error);
        return null;
    }
  };
  

// run();




export const getExistingTour = async ({ city, country }) => {
    return prisma.tour.findUnique({
      where: {
        city_country: {
          city,
          country,
        },
      },
    });
  };
  
export const createNewTour = async (tour) => {
    return prisma.tour.create({
      data: tour,
    });
  };


  export const getAllTours = async (searchTerm) => {
    if (!searchTerm) {
      const tours = await prisma.tour.findMany({
        orderBy: {
          city: 'asc',
        },
      });
  
      return tours;
    }
  
    const tours = await prisma.tour.findMany({
      where: {
        OR: [
          {
            city: {
              contains: searchTerm,
            },
          },
          {
            country: {
              contains: searchTerm,
            },
          },
        ],
      },
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  };


  export const getSingleTour = async (id) => {
    return prisma.tour.findUnique({
      where: {
        id,
      },
    });
  };


  
