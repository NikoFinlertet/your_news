'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock server actions
const updateAboutYou = async (data: { about: string }) => {
  console.log('Updating about you:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const updateInterests = async (data: { interests: string[] }) => {
  console.log('Updating interests:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const updateTimeSettings = async (data: { 
  days: string[],
  hour: string 
}) => {
  console.log('Updating time settings:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const updateProfileLink = async (data: { link: string }) => {
  console.log('Updating profile link:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "Талантливый ML-инженер, участвовал в создании мобильных приложений в Сбербанке, интересуюсь библейской тематикой";
}

const generateInterests = async () => {
  console.log('Generating interests');
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return ['AI', 'ML', 'Machine Learning', 'Deep Learning'];
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileLink, setProfileLink] = useState('');
  const [about, setAbout] = useState('');
  const [interests, setInterests] = useState<string[]>(['']);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState('09:00');
  const [isLoading, setIsLoading] = useState(false);

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];

  const handleChangeIndex = async (index: number) => {
    setIsLoading(true);

    try {
      switch (currentStep) {
        case 0:
          setAbout(await updateProfileLink({ link: profileLink }));
          await updateAboutYou({ about });
          break;
        case 1:
          await updateInterests({ interests: interests.filter(i => i.trim() !== '') });
          break;
        case 2:
          await updateTimeSettings({ 
            days: selectedDays,
            hour: selectedHour
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
      if (currentStep === 0) {
        setAbout(await updateProfileLink({ link: profileLink }));
        await updateAboutYou({ about });
      } else if (currentStep === 1) {
        await updateInterests({ interests: interests.filter(i => i.trim() !== '') });
      } else if (currentStep === 2) {
        await updateTimeSettings({ 
          days: selectedDays,
          hour: selectedHour
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
    setCurrentStep(prev => prev - 1);
  };

  const handleProfileLinkSubmit = async () => {
    setIsLoading(true);
    try {
      const profileText = await updateProfileLink({ link: profileLink });
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

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-[640px] rounded-2xl p-8 border border-gray-200 shadow-lg">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {['О себе', 'Интересы', 'Время дайджеста'].map((step, index) => (
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <button
                  onClick={addInterestField}
                  className="text-gray-500 px-2 py-2 -mt-2 -ml-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </button>
                <button
                  onClick={handleGenerateInterests}
                  className="text-gray-500 px-2 py-2 -mt-2 -ml-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">Когда вы хотите получать новости?</h2>
              <div className="grid grid-cols-2 gap-4">
                {weekDays.map(day => (
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
                <label className="block mb-2 text-gray-300">Во сколько вы бы хотели получать новости?</label>
                <input
                  type="time"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
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
              {isLoading ? 'Loading...' : currentStep === 2 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 