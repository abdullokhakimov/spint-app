import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ru',
	supportedLngs: ['ru', 'uz'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
		ru: {
			translation: {
				authentication: {
					login__title: 'Войти в аккаунт',
					login__subtitle: "Забронируйте свой матч с легкостью!",
					login__username: "Имя пользователя",
					login__password: "Пароль",
					login__email: "Электронная почта",
					login__password__submit: "Подтверждение пароля",
					login: "Войти",
					login__redirect: "Ещё нет аккаунта?",
					signup: "Зарегистрироваться",
					signup__title: "Создать аккаунт",
					signup__redirect: "Уже есть аккаунт?",
					activation__title: "Активация аккаунта",
					activation__subtitle: "Активируйте свой аккаунт нажав кнопку ниже",
					activation: 'Активировать',
				},
				navbar__labels: {
					home: "Главная",
					team: "Команда",
					bookings: "Брони",
					profile: "Профиль",
				},
				home: {
					facility__list: {
						facilities__title: "Сооружения",
						facilities__list__noresults__title: "Ничего не найденo"
					},
					facility__search: {
						filters__search__input__placeholder: "Поиск сооружений",
					},
					facility__filters: {
						gametype__label__selection: "Все виды спорта",
						gametype__modal__title: "Выберите вид спорта",
						region: "Район",
						region__label__selection: "Все районы города",
						region__modal__title: "Выберите район",
					},
					maps: {
						maps__working__time: "Время работы",
						maps__detail: "Подробнее",
					},
					map__button: "Карта",
					list__button: "Список", 
				},
				facility__detail: {
					book: {
						login: "Войдите в аккаунт",
						owner__permission: "Владельцы сооружений не могут бронировать",
						not__selected: "Пока ничего не выбрано",
						tobook: "Забронировать",
						booking: "Бронирование...",
					},
					benefits: {
						title: "Удобства",
					},
					contacts: {
						title: "Контакты",
						button: "Позвонить"
					},
					location: {
						title: "Располажение",
						link: "Перейти на карты"
					}
				},
				teams: {
					title: "Скоро!",
					subtitle: "Эта часть сайта в данное время находиться в стадии разработки. Просим вас ожидать и благодарим за термение"
				},
				notfound: {
					title: "Страница не найдена",
					subtitle: "Вы приземлились там, где не должны были быть. Даже Google не знает, что эта страница существует.",
					link: "Вернуться домой",
				},
				not__loggedin: {
					title: "Вы не вошли в аккаунт",
					subtitle: "Что бы смотреть данные на этой странице, вы должны создать или войти в свой аккаунт"
				},
				bookings: {
					user__title: "Мои брони",
					owner__title: "Брони Сооружения",
					item: {
						owner__info__user: "Бронироващик",
						date: "Дата",
						time: "Время",
						payment: "Опциия оплаты",
						sum: "Оплаченная сумма",
						invite: "Пригласить",
						find__user: "Найти пользователя",
						search: "Поиск",
						link__copied: "Ссылка скопирована",
						invite__by__link: "Пригласить по ссылке",
						invited__users: "Приглашенные пользователи",
						noone__invited: "Нет приглашенных",
						exclude: "Исключить",
					},
					noresult: {
						title: "Вы пока не забронировали ни одного сооурежения",
						subtitle: "Старайтесь больше организовавывать события на сайте, бронируя привлекательные вам сооурежения",
					},
				},
				profile: {
					title: "Мой профиль",
					city: "Ташкент",
					about: {
						title: "О нас",
						paragraph1: "Мы - команда энтузиастов, любящих спорт и активный образ жизни. Наша миссия - сделать процесс поиска и бронирования спортивных сооружений простым, удобным и веселым. Мы верим, что доступ к спортивным площадкам и объектам должен быть легким для каждого, кто хочет заняться своими любимыми видами спорта.",
						paragraph2: "На нашем сайте вы можете легко найти и забронировать различные спортивные сооружения: от футбольных полей и теннисных кортов до плавательных бассейнов. Мы сотрудничаем с широким спектром объектов по всему городу, чтобы предложить вам максимальный выбор и удобство.",
						paragraph3: "Но это еще не все! Мы также предлагаем вам возможность приглашать своих друзей и делиться с ними своими спортивными планами. С нашим удобным функционалом приглашений, вы можете легко организовать тренировку или игровой матч и пригласить своих друзей присоединиться к вам. Вместе веселее и эффективнее достигать своих спортивных целей!",
					},
					contacts: {
						title: "Контакты",
						phone: "Номер телефона",
						mail: "Электронная почта"
					},
					languages: {
						title: "Выберите язык",
					},
					logout: "Выйти",
				},
				notifications: {
					title: "Уведомления",
					noresult: {
						title: "Вы не пока не получили ни одного уведомления",
						subtitle: "Старайтесь быть более активным на сайте, что бы получать и отправлять приглашения в игру другим пользователям."
					},
					item: {
						title: "Приглашение в игру",
						accept: "Принять",
						accepting: "Принятие",
						reject: "Отклонить",
						rejecting: "Отклонение"
					},
				},
				toast: {
					create__new__user__success: "Аккаунт успешно создан. Перейдите в электронную почту, что бы активировать аккаунт.",
					create__new__user__error: "Регистрация прошла неуспешно. Повторите попытку позже.",
					login__success: "Вы вошли в аккаунт",
					login__error: "Вход прошёл неуспешно",
					verify__success: "Аккаунт активирован. Войдите в свой аккаунт",
					verify__error: "Аккаунт не существует или уже активирован",
					check__authenticated: "Ваш аккаунт недействителен",
					load__games__error: "Ошибка при загрузке данных игр",
					load__regions__error: "Ошибка при загрузке данных районов",
					load__facilities__error: "Ошибка при загрузке данных сооружений",
					load__coordinates__error: "Ошибка при загрузке координаты адреса сооружений",
					booking__success: "Успешно забронировано",
					booking__error: "Возникла ошибка. Повторите попытку",
					invite__success: "Приглашение отправлено",
					invite__error: "Возникла ошибка при отправке приглашения",
				},
				zod_validation: {
					password__length: "Пароль должен состоять не менее чем из 8 символов",
					password__letter: "Пароль должен содержать хотя бы одну строчную букву",
					password__capital__letter: "Пароль должен содержать хотя бы одну заглавную букву",
					password__number: "Пароль должен содержать хотя бы одну цифру",
					password__email: "Неправильная электронная почта",
					password__match: "Пароли не совподают",
				},
				others: {
					loading: 'Загрузка...',
					som: "сум",		
				}
			}
		},
		uz: {
			translation: {
				authentication: {
					login__title: 'Akkauntga kirish',
					login__subtitle: "O'yiningizni osongina band qiling!",
					login__username: "Foydalanuvchi nomi",
					login__password: "Parol",
					login__email: "Elektron pochta",
					login__password__submit: "Parolni tasdiqlash",
					login: "Kirish",
					login__redirect: "Hali akkauntingiz yo'qmi?",
					signup: "Ro'yxatdan o'tish",
					signup__title: "Akkaunt yaratish",
					signup__redirect: "Allaqachon akkauntingiz bormi?",
					activation__title: "Akkauntni faollashtirish",
					activation__subtitle: "Quyidagi tugmani bosish orqali akkauntingizni faollashtiring",
					activation: 'Faollashtirish',
				},
				navbar__labels: {
					home: "Uy",
					team: "Jamoa",
					bookings: "Bronlar",
					profile: "Profil",
				},
				home: {
					facility__list: {
						facilities__title: "Inshootlar",
						facilities__list__noresults__title: "Hech narsa topilmadi"
					},
					facility__search: {
						filters__search__input__placeholder: "Inshootlarni qidirish",
					},
					facility__filters: {
						gametype__label__selection: "Hamma sport turlari",
						gametype__modal__title: "Sport turini tanglang",
						region: "Tuman",
						region__label__selection: "Hamma tumanlar",
						region__modal__title: "Tumanni tanglang",
					},
					maps: {
						maps__working__time: "Ish vaqti",
						maps__detail: "Batafsil",
					},
					map__button: "Xarita",
					list__button: "Ro'yxat", 
				},
				facility__detail: {
					book: {
						login: "Akkauntingizga kiring",
						owner__permission: "Inshoot egalari band qilishlari mumkin emas",
						not__selected: "Hali xech narsa tanlanmadi",
						tobook: "Band qilish",
						booking: "Band qilinyapti...",
					},	
					benefits: {
						title: "Qulayliklar",
					},
					contacts: {
						title: "Kontaktlar",
						button: "Qo'ng'iroq qilish"
					},
					location: {
						title: "Manzil",
						link: "Xaritaga o'tish"
					},
				},
				teams: {
					title: "Tez orada!",
					subtitle: "Saytning ushbu qismi hozirda ishlab chiqilmoqda. Iltimos, kuting va sabringiz uchun rahmat"
				},
				notfound: {
					title: "Sahifa topilmadi",
					subtitle: "Siz kerak bo'lmagan joyga tushdingiz. Hatto Google ham bu sahifa mavjudligini bilmaydi.",
					link: "Bosh sahifaga qaytish",
				},
				not__loggedin: {
					title: "Siz akkauntingizga kirmagansiz",
					subtitle: "Ushbu sahifadagi ma'lumotlarni ko'rish uchun akkaunt yaratishingiz yoki unga kirishingiz kerak."
				},
				bookings: {
					user__title: "Mening bandlovlarim",
					owner__title: "Inshoot bandlari",
					item: {
						owner__info__user: "Band qiluvchi",
						date: "Sana",
						time: "Vaqt",
						payment: "To'lov turi",
						sum: "To'langan summa",
						invite: "Taklif qilish",
						find__user: "Foydalanuvchini topish",
						search: "Qidiruv",
						link__copied: "Havola ko'chirildi",
						invite__by__link: "Havola orqali chaqirish",
						invited__users: "Taklif qilingan foydalanuvchilar",
						noone__invited: "Chaqirilganlar yo'q",
						exclude: "Chiqarib tashlash",
					},
					noresult: {
						title: "Siz hali hech qanday inshootni band qilmadingiz",
						subtitle: "Saytda ko'proq tadbirlar tashkil etishga harakat qiling, siz uchun jozibali inshootlarni band qiling",
					},
				},
				profile: {
					title: "Mening profilim",
					city: "Toshkent",
					about: {
						title: "Biz haqimizda",
						paragraph1: "Biz sport va faol turmush tarzini yaxshi ko'radigan ishqibozlar jamoasimiz. Bizning vazifamiz sport inshootlarini topish va band qilish jarayonini sodda, qulay va qiziqarli qilishdir. Bizning fikrimizcha, sevimli sport turlari bilan shug'ullanmoqchi bo'lgan har bir kishi uchun sport maydonchalari va inshootlariga kirish oson bo'lishi kerak.",
						paragraph2: "Bizning saytimizda siz futbol maydonchalari va tennis kortlaridan tortib suzish havzalarigacha bo'lgan turli xil sport inshootlarini osongina topishingiz va bron qilishingiz mumkin. Biz sizga eng yaxshi tanlov va qulaylikni taklif qilish uchun shahar bo'ylab keng ko'lamli inshootlar bilan hamkorlik qilamiz.",
						paragraph3: "Ammo bu hammasi emas! Shuningdek, biz sizga do'stlaringizni taklif qilish va ular bilan sport rejalaringizni baham ko'rish imkoniyatini taklif qilamiz. Bizning qulay taklifnomalarimiz bilan siz osongina mashg'ulot yoki o'yin tashkil qilishingiz va do'stlaringizni sizga qo'shilishga taklif qilishingiz mumkin. Birgalikda sport maqsadlariga erishish yanada qiziqarli va samaraliroq!",
					},
					contacts: {
						title: "Kontaktlar",
						phone: "Telefon raqam",
						mail: "Elektron pochta"
					},
					languages: {
						title: "Tilni tanlang",
					},
					logout: "Chiqish",
				},
				notifications: {
					title: "Bildirishnomalar",
					noresult: {
						title: "Siz hali hech qanday bildirishnoma olmagansiz",
						subtitle: "Boshqa foydalanuvchilarga o'yinga taklifnomalarni qabul qilish va yuborish uchun saytda faolroq bo'lishga harakat qiling."
					},
					item: {
						title: "O'yinga taklif",
						accept: "Qabul qilish",
						accepting: "Qabul qilinyapti",
						reject: "Rad etish",
						rejecting: "Rad etilyapti"
					},
				},
				toast: {
					create__new__user__success: "Akkaunt muvaffaqiyatli yaratildi. Akkauntingizni faollashtirish uchun elektron pochtangizga o'ting",
					create__new__user__error: "Ro‘yxatdan o‘tish muvaffaqiyatsiz tugadi. Iltimos keyinroq qayta urinib ko'ring",
					login__success: "Siz akkauntingizga kirdingiz",
					login__error: "Kirish amalga oshmadi",
					verify__success: "Akkauntingiz faollashtirildi. Akkauntingizga kiring",
					verify__error: "Akkaunt mavjud emas yoki allaqachon faollashtirilgan",
					check__authenticated: "Akkauntingiz yaroqsiz",
					load__games__error: "Oʻyin maʼlumotlarini yuklashda xatolik yuz berdi",
					load__regions__error: "Tuman maʼlumotlarini yuklashda xatolik yuz berdi",
					load__facilities__error: "Inshootlar maʼlumotlarini yuklashda xatolik yuz berdi",
					load__coordinates__error: "Inshootlar manzili koordinatalarini yuklashda xatolik yuz berdi",
					booking__success: "Muvaffaqiyatli band qilindi",
					booking__error: "Xatolik yuz berdi. Qayta urinib ko'ring",
					invite__success: "Taklifnoma yuborildi",
					invite__error: "Taklifnomani yuborishda xatolik yuz berdi",
				},
				zod_validation: {
					password__length: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
					password__letter: "Parol kamida bitta kichik harfdan iborat bo'lishi kerak",
					password__capital__letter: "Parol kamida bitta bosh harfdan iborat bo'lishi kerak",
					password__number: "Parolda kamida bitta raqam bo'lishi kerak",
					password__email: "Noto'g'ri elektron pochta",
					password__match: "Parollar mos kelmayapti",
				},
				others: {
					loading: 'Yuklanmoqda...',
					som: "so'm",
				}
			}
		}
    }
  });

export default i18n;