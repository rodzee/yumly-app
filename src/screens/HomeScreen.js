import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';

// LIBs IMPORTS //
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// COMP IMPORTS //
import Categories from '../components/categories';
import Recipes from '../components/recipes';

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = (category) => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    };

    const getCategories = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            // console.log('got categories: ', response.data);
            if (response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    };

    const getRecipes = async (category = 'Beef') => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            //   console.log("got recipes: ", response.data);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    };

    return (
        <View className='flex-1 bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className='space-y-6 pt-14'
            >
                {/* Avatar and Bell Icon */}
                <View className='mx-4 flex-row justify-between items-center mb-2'>
                    <Image source={require('../../assets/avatar.png')} style={{ height: hp(5), width: hp(5) }} />
                    <BellIcon size={hp(4)} color='gray' />
                </View>

                {/* Greetings */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }}>Hello, Rodzee!</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-[#333]'>
                            Make Your Own Food,
                        </Text>
                    </View>
                    <Text className='font-semibold text-[#333]' style={{ fontSize: hp(3.8) }}>
                        stay at
                        <Text className='text-[#FEDC56]'> home</Text>
                    </Text>
                </View>

                {/* Search Bar */}
                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] '>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'#333'}
                        style={{ fontSize: hp(1.7) }}
                        className='flex-1 text-left mb-1 pl-3 tracking-wider'
                    />
                    <View className='bg-white rounded-full p-3'>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'#333'} />
                    </View>
                </View>
                {/* Categories */}
                <View>
                    {categories.length > 0 && (
                        <Categories
                            categories={categories}
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                    )}
                </View>

                {/* Recipes */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    );
}
