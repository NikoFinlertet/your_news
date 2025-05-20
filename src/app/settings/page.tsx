'use client';

import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSources, supabase } from '@/lib/dataProvider';
import { useCookies } from 'next-client-cookies';

// Mock server actions
const getAboutYou = async (user_id: string) => {
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .select('description')
    .eq('id', user_id)
    .single();
  
  if (error) {
    console.error('Supabase error:', error);
    return null;
  }

  return data?.description;
}

const updateAboutYou = async (user_id: string, data: { about: string }) => {
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  console.log('Updating about you:', data);

  const { data: res, error } = await supabase
    .from('users')
    .update({ description: data.about })
    .eq('id', user_id);

  if (error) {
    console.error('Supabase error:', error);
    return null;
  }

  return res;
};

const updateSources = async (user_id: string, data: { sources: string[] }) => {
  // if (!supabase) {
  //   console.log('Supabase client is not initialized');
  //   return null;
  // }

  // console.log('Updating sources:', data);

  // const { data: sourcesIds, error: source_error } = await supabase
  //   .from('sources')
  //   .select('id')
  //   .in('title', data.sources);

  // if (source_error) {
  //   console.error('Supabase error:', source_error);
  //   return null;
  // }

  // const { data: delete_res, error: delete_error } = await supabase
  //   .from('user_sources')
  //   .delete()
  //   .eq('id', user_id)
  //   .not('source_id', 'IN', sourcesIds.map(item => item.id));

  // if (delete_error) {
  //   console.error('Supabase error:', delete_error);
  //   return null;
  // }
  
  // // HOWTO insert?
  // const { data: res, error: insert_error } = await supabase
  //   .from('user_sources')
  //   .insert(sourcesIds.map(item => ({ user_id, source_id: item.id })));

  //   if (insert_error) {
  //     console.error('Supabase error:', insert_error);
  //     return null;
  //   }

  // return res;
  return null;
};

const generateSources = async (user_id: string) => {
  console.log('Generating sources');
  // Simulate API call
  // /choose_posts_for_user
  await new Promise(resolve => setTimeout(resolve, 1000));
  return ['the_holy_bible'];
}

const updateInterests = async (user_id: string, data: { interests: string[] }) => {
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  console.log('Updating interests:', data);

  const { data: res, error } = await supabase
    .from('users')
    .update({ queries: '[\n"' + data.interests.join('","') + '"\n]' })
    .eq('id', user_id);
  
  if (error) {
    console.error('Supabase error:', error);
    return null;
  }

  return res;
};

const updateTimeSettings = async (user_id: string, data: { 
  days: number[],
  hour: number,
  timeZone: string
}) => {
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  console.log('Updating time settings:', data);

  const { data: res, error } = await supabase
    .from('users')
    .update({ "cron_pattern": `0 ${data.hour} * * ${data.days.join(',')}`, timezone: data.timeZone })
    .eq('id', user_id);
  
  if (error) {
    console.error('Supabase error:', error);
    return null;
  }

  return res;
};

const updateProfileLink = async (user_id: string, data: { link: string }) => {
  console.log('Updating profile link:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "Талантливый ML-инженер, участвовал в создании мобильных приложений в Сбербанке, интересуюсь библейской тематикой";
}

const generateInterests = async () => {
  console.log('Generating interests');
  // Simulate API call
  // /generate_queries
  await new Promise(resolve => setTimeout(resolve, 1000));
  return ['AI', 'ML', 'Machine Learning', 'Deep Learning'];
}

export default function OnboardingPage() {
  const router = useRouter();
  const cookies = useCookies();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [currentStep, setCurrentStep] = useState(0);
  const maxSteps = 3;
  const [profileLink, setProfileLink] = useState('');
  const [about, setAbout] = useState('');
  const [interests, setInterests] = useState<string[]>(['']);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [searchSources, setSearchSources] = useState<string>('');
  const [filteredSources, setFilteredSources] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState('09:00');
  const [isLoading, setIsLoading] = useState(false);

  const userId = cookies.get('yournews_user_id');
  if (!userId) {
    console.log('No user id found');
    router.push('/');
    return null;
  }

  const weekDaysList = [
    'Понедельник', 'Вторник', 'Среда', 'Четверг',
    'Пятница', 'Суббота', 'Воскресенье'
  ];


  const weekDays: Record<string, number> = {
    'Понедельник': 1, 'Вторник': 2, 'Среда': 3, 'Четверг': 4,
    'Пятница': 5, 'Суббота': 6, 'Воскресенье': 7
  };

  const fetchAbout = async () => {
    const about = await getAboutYou(userId);
    setAbout(about || '');
  }

  if (!about)
    fetchAbout();

  const fetchSources = async () => {
    const sources = await getSources();
    setSources(sources);
    setFilteredSources(sources);
  }

  if (!sources.length)
    fetchSources();

  const handleChangeIndex = async (index: number) => {
    setIsLoading(true);

    try {
      switch (currentStep) {
        case 0:
          !about && setAbout(await updateProfileLink(userId, { link: profileLink }));
          await updateAboutYou(userId, { about });
          break;
        case 1:
          await updateInterests(userId, { interests: interests.filter(i => i.trim() !== '') });
          break;
        case 2:
          await updateSources(userId, { sources: selectedSources });
          break;
        case 3:
          console.log(selectedDays, selectedDays.map(day => weekDays[day]));
          console.log(selectedHour, selectedHour.slice(0, 2), Number(selectedHour.slice(0, 2)));
          await updateTimeSettings(userId, { 
            days: selectedDays.map(day => weekDays[day]),
            hour: Number(selectedHour.slice(0, 2)),
            timeZone
          });
          break;
        default:
          break;
      }
      setCurrentStep(index);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNext = async () => {
    setIsLoading(true);
    try {
      switch (currentStep) {
        case 0:
          !about && setAbout(await updateProfileLink(userId, { link: profileLink }));
          await updateAboutYou(userId, { about });
          break;
        case 1:
          await updateInterests(userId, { interests: interests.filter(i => i.trim() !== '') });
          break;
        case 2:
          await updateSources(userId, { sources: selectedSources });
          break;
        case 3:
          await updateTimeSettings(userId, { 
            days: selectedDays.map(day => weekDays[day]),
            hour: Number(selectedHour.slice(0, 2)),
            timeZone
          });
          router.push('/');
          return;
      }
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    handleChangeIndex(currentStep - 1);
  };

  const handleProfileLinkSubmit = async () => {
    setIsLoading(true);
    try {
      const profileText = await updateProfileLink(userId, { link: profileLink });
      setAbout(profileText);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addInterestField = () => {
    setInterests(prev => [...prev, '']);
  };

  const updateInterest = (index: number, value: string) => {
    setInterests(prev => {
      const newInterests = [...prev];
      newInterests[index] = value;
      return newInterests;
    });
  };

  const removeInterest = (index: number) => {
    setInterests(prev => {
      const newInterests = [...prev];
      newInterests.splice(index, 1);
      return newInterests;
    });
  };

  const handleGenerateInterests = async () => {
    setIsLoading(true);
    try {
      const generatedInterests = await generateInterests();
      const interestsToUpdate = [...interests, ...generatedInterests];
      setInterests(interestsToUpdate.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [] as string[]));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSources: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchSources(event.target.value);
    event.target.value ? setFilteredSources(sources.filter(s => s.toLowerCase().includes(event.target.value.toLowerCase()))) : setFilteredSources(sources);
  }

  const handleGenerateSources = async () => {
    setIsLoading(true);
    try {
      const generatedSources = await generateSources(userId);
      const sourcesToUpdate = [...selectedSources, ...generatedSources];
      setSelectedSources(sourcesToUpdate.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [] as string[]));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const toggleSrc = (src: string) => {
    setSelectedSources(prev => 
      prev.includes(src) 
        ? prev.filter(s => s !== src)
        : [...prev, src]
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-[640px] max-h-[calc(100vh - 40px)] rounded-2xl p-8 border border-gray-200 shadow-lg">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {['О себе', 'Интересы', 'Источники', 'Время дайджеста'].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? 'text-gray-300' : 'text-gray-500'
                  }`}
                onClick={() => handleChangeIndex(index)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep ? 'border-gray-300' : 'border-gray-500'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">О себе</h2>
              <span className="text-gray-500">Расскажите нам о себе. Вы можете вставить ссылку на ваш профиль ниже и мы соберем информацию из него.</span>
              <div className="w-full flex items-center space-x-2">
                <input
                  type="text"
                  value={profileLink}
                  onChange={(e) => setProfileLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="vk.com/example"
                />
                <button
                  onClick={handleProfileLinkSubmit}
                  className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600"
                >
                  Сохранить
                </button>
              </div>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Расскажите о себе..."
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Какими новостями вы интересуетесь?</h2>
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    key={index}
                    type="text"
                    value={interest}
                    onChange={(e) => updateInterest(index, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Например: Рынок видеокарт"
                  />
                  <button
                    onClick={() => removeInterest(index)}
                    className="text-white py-3 px-4 rounded-lg hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <button
                  onClick={addInterestField}
                  className="text-gray-500 px-2 py-2 -mt-2 -ml-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </button>
                <button
                  onClick={handleGenerateInterests}
                  className="text-gray-500 px-2 py-2 -mt-2 -ml-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">Какие источники вас интересуют?</h2>
              <div className="flex items-center space-x-2">
                <input type="text" value={searchSources} onChange={handleSearchSources} placeholder='Поиск...' className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button
                  onClick={handleGenerateSources}
                  className="text-gray-500 px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredSources.map(src => (
                  <div key={src} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={src}
                      checked={selectedSources.includes(src)}
                      onChange={() => toggleSrc(src)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={src} className="text-gray-400">{src}</label>
                  </div>
                ))}
              </div>
              {/* add new source */}
              
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">Когда вы хотите получать новости?</h2>
              <div className="grid grid-cols-2 gap-4">
                {weekDaysList.map(day => (
                  <div key={day} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={day}
                      checked={selectedDays.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={day} className="text-gray-400">{day}</label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-gray-300">Во сколько вы бы хотели получать новости ({timeZone})?</label>
                <input
                  type="time"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-16">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : currentStep === maxSteps ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 
