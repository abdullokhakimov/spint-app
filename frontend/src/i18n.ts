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
					reset_password__title: "Сбросить пароль",
					reset_password__subtitle: "Введите новый пароль, что бы сбросить текущий",
					reset_password__password: "Новый пароль",
					reset_password__re_password: "Подтверждение новового пароля",
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
					},
					checkout: {
						title: "Оформление брони",
						payment_type__title: "Опция оплаты",
						payment_type__deposit: "Депозит",
						payment_type__deposit__subtitle: "40% от суммы",
						payment_type__full: "Полная оплата",
						payment_type__full__subtitle: "100%",
						payment_option__title: "Способ оплаты",
						booking_info__date: "Дата:",
						booking_info__time: "Время:",
						pay: "Оплатить",
					},
				},
				teams: {
					title: "Скоро!",
					subtitle: "Эта часть сайта в данное время находиться в стадии разработки. Просим вас ожидать и благодарим за терпение"
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
						organizer: "Организатор",
						participant: "Участник", 
						owner__info__user: "Номер брони",
						date: "Дата",
						time: "Время",
						payment: "Опциия оплаты",
						sum: "Оплаченная сумма",
						deposit: "Депозит (40%)",
						full: "Полная оплата",
						state: "Состояние",
						finished: "Оплачен",
						not_finished: "Не оплачен",
						pay: "Оплатить через Payme",
						invite: "Пригласить",
						find__user: "Найти пользователя",
						search: "Поиск",
						link__copied: "Ссылка скопирована",
						invite__by__link: "Пригласить по ссылке",
						invited__users: "Приглашенные пользователи",
						noone__invited: "Нет приглашенных",
						exclude: "Исключить",
					},
					by_uuid: {
						title: "Вас пригласили в игру",
						join: "Присоедениться",
					},
					noresult: {
						title: "Вы пока не забронировали ни одного сооурежения",
						subtitle: "Старайтесь больше организовавывать события на сайте, бронируя привлекательные вам сооурежения",
					},
				},
				profile: {
					title: "Мой профиль",
					city: "Ташкент",
					owner: "Владелец сооружения",
					settings: "Настройки",
					phone: {
						content: "Не указан",
						button: "Добавить", 
						modal__number__title: "Номер телефона",
						modal__number__subtitle: "Мы отправим код или позвоним. Отвечать на звонок не нужно. Код придёт в СМС",
						modal__number__input: "Номер телефона",
						modal__number__button: "Получить код",
						modal__verificationcode__title: "Введите код",
						modal__verificationcode__subtitle: "Мы отправили код подтверждения на номер телефона",
						modal__verificationcode__timer: "Введите код в течении",
					},
					about: {
						title: "О нас",
						paragraph1: "Мы - команда энтузиастов, любящих спорт и активный образ жизни. Наша миссия - сделать процесс поиска и бронирования спортивных сооружений простым, удобным и веселым. Мы верим, что доступ к спортивным площадкам и объектам должен быть легким для каждого, кто хочет заняться своими любимыми видами спорта.",
						paragraph2: "На нашем сайте вы можете легко найти и забронировать различные спортивные сооружения: от футбольных полей и теннисных кортов до плавательных бассейнов. Мы сотрудничаем с широким спектром объектов по всему городу, чтобы предложить вам максимальный выбор и удобство.",
						paragraph3: "Но это еще не все! Мы также предлагаем вам возможность приглашать своих друзей и делиться с ними своими спортивными планами. С нашим удобным функционалом приглашений, вы можете легко организовать тренировку или игровой матч и пригласить своих друзей присоединиться к вам. Вместе веселее и эффективнее достигать своих спортивных целей!",
						company_name: "ООО Spint",
					},
					contacts: {
						title: "Служба поддержки",
						phone: "Номер телефона",
						mail: "Электронная почта"
					},
					languages: {
						button: "Изменить язык",
						title: "Выберите язык",
					},
					personal_information: {
						title: "Личная информация",
						profile__title: "Профиль",
						profile__subtitle: "Всё что вы расскажете, поможет нам и другим игрокам узнать вас получше",
						change_logo: "Изменить",
						change_username: "Имя пользователя",
						username_exist_error: "Такое имя пользователя уже существует",
						change_password__title: "Сброисть пароль",
						change_password__subtitle: "Вы действительно хотите сбросить пароль?",
						change_birth_date__title: "День рождения",
						change_birth_date__subtitle: "Введите правильную дату",
						change_favorite_sports: {
							title: "Любимые виды спорта",
							selected_sports__title: "Выбранные виды спорта",
							subtitle: "Выберите 3 любимых вид спорта и уровень владения",
							select_sport: "Выберите спорт",
							select_level: "Выберите уровень владения",
							sports: {
								title: "Вид",
								Football: "Футбол", 
								Basketball: "Баскетбол", 
								Tennis: "Теннис", 
								Volleyball: "Волейбол",
  								Billiard: "Бильярд", 
								Golf: "Гольф", 
								Bowling: "Боулинг", 
								Table_Tennis: "Настольный теннис",
							},
							levels: {
								title: "Уровень",
								Beginner: "Начинающий",
								Intermediate: "Средний",
								Advanced: "Продвинутый",
							}
						},
						change_free_time: {
							title: "Cвободное время",
							subtitle: "Выберите время, когда вам удобно заниматься спортом",
							button__title: "Выберите время",
							options: {
								Morning: "Утром (до 12:00)",
								Day: "Днём (12:00 - 18:00)",
								Evening: "Вечером (18:00 - 24:00)",
								Flexible: "Гибкое расписание",
							}
						},
						change_home: {
							title: "Место жительство",
							subtitle: "Укажите на карте своё место проживания",
							address: "Адрес",
							address__not_found: "Адрес не найден",
							address__error: "Ошибка при поиска адреса",
						},
						no__button: "Нет",
						yes__button: "Да",
						ready__button: "Готово",
						save__button: "Сохранить",
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
				partners: {
					become_partner: "Станьте нашим парнером",
					become_partner_subtitle: "Свяжитесь с нами и получайте доход. Это просто.",
					header__title: "Присоединяйтесь к нашей сети",
					header__title__span: "спортивных объектов",
					header__subtitle__mobile: "Расширьте аудиторию и увеличьте доход с нашей платформой",
					header__subtitle__pc: "Расширьте свою аудиторию, увеличьте бронирования и повысите доход с нашей спортивной платформой",
					header__button: "Стать партнёром",
					benefits__title: "Преимущества партнерства",
					benefits__item__more_bookings: "Больше бронирований",
					benefits__item__additional_income: "Дополнительный доход",
					benefits__item__simple_management: "Простое управление",
					benefits__item__sales_analyze: "Анализ продаж",
					modal__title: "Оставьте номер телефона",
					modal__button: "Отправить",
				},
				toast: {
					create__new__user__success: "Аккаунт успешно создан. Перейдите в электронную почту, что бы активировать аккаунт.",
					create__new__user__error: "Регистрация прошла неуспешно. Повторите попытку позже.",
					login__success: "Вы вошли в аккаунт",
					login__error: "Вход прошёл неуспешно",
					verify__success: "Аккаунт активирован. Войдите в свой аккаунт",
					verify__error: "Аккаунт не существует или уже активирован",
					check__authenticated: "Ваш аккаунт недействителен",
					update__user__success: "Данные профиля успешно обновлены",
					update__user__error: "Ошибка обновления информации профиля.",
					reset__password__success: "Мы отправили письмо со ссылкой на сброс пароля на почту",
					reset__password__error: "Ошибка при сбросе пароля",
					reset__password__confirm__success: "Пароль успешно изменён",
					reset__password__confirm__error: "Ошибка при изменении пароля",
					load__games__error: "Ошибка при загрузке данных игр",
					load__regions__error: "Ошибка при загрузке данных районов",
					load__facilities__error: "Ошибка при загрузке данных сооружений",
					load__coordinates__error: "Ошибка при загрузке координаты адреса сооружений",
					booking__success: "Успешно забронировано",
					booking__error: "Возникла ошибка. Повторите попытку",
					invite__success: "Приглашение отправлено",
					invite__error: "Возникла ошибка при отправке приглашения",
					phonenumber__verificationcode__error: "Возникла ошибка при отправке кода",
					phonenumber__time__end: "Время истекло",
					phonenumber__save__success: "Телефон номер успешно добавлен",
					phonenumber__save__error: "Возникла ошибка при добавлении номера телефона",
					booking__byuuid__404__error: "Бронь не найдена",
					booking__byuuid__owner__error: "Владельцы полей не могут присоеденяться к играм",
					booking__byuuid__late__error: "Слишком поздно",
					booking__byuuid__organizer__error: "Вы организатор этой игры",
					booking__byuuid__invited__users__error: "Вы уже присоеденились к этой игре",
					profile__personal_information__upload_logo__type__error: "Неверный тип файла. Разрешены только JPEG и PNG",
					profile__personal_information__upload_logo__size__error: "Размер файла превышает лимит в 2 МБ",
					profile__personal_information__change_email__info: "В данное время нельзя изменить электронную почту",
				},
				zod_validation: {
					password__length: "Пароль должен состоять не менее чем из 8 символов",
					password__letter: "Пароль должен содержать хотя бы одну строчную букву",
					password__capital__letter: "Пароль должен содержать хотя бы одну заглавную букву",
					password__number: "Пароль должен содержать хотя бы одну цифру",
					password__email: "Неправильная электронная почта",
					password__match: "Пароли не совподают",
				},
				helmet: {
					home: {
						title: "Spint - Найдите и забронируйте спортивные объекты рядом",
						meta__description: "Найдите и забронируйте спортивные объекты рядом с вами. Футбольные поля, теннисные корты, баскетбольные площадки и спортзалы - всё это доступно для бронирования в Spint: футбольные поля, баскетбольные площадки, теннисные корты, плавательные бассейны, настольый теннис, бильярд, воллейбольные плошадки, бовлинг",
					},
					teams: {
						title: "Команды",
						meta__description: "Создайте свою команду и приглашайте своих друзей в игру",
					},
					bookings: {
						title: "Мои Брони",
						meta__description: "Смотрите полную информацию и историю своих броней",
					},
					profile: {
						title: "Мой профиль",
						meta__description: "Смотрите полную информацию о своём профиле",
						personal_information: {
							title: "Личная информация",
							meta__description: "Всё что вы расскажете, поможет нам и другим игрокам узнать вас получше",
						}
					},
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
					reset_password__title: "Parolni tiklash",
					reset_password__subtitle: "Joriy parolni tiklash uchun yangi parolni kiriting",
					reset_password__password: "Yangi parol",
					reset_password__re_password: "Yangi parolni tasdiqlang",
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
					checkout: {
						title: "Bandlovni rasmiylashtirish",
						payment_type__title: "To'lov opsiyasi",
						payment_type__deposit: "Depozit",
						payment_type__deposit__subtitle: "Miqdorning 40%",
						payment_type__full: "To'liq to'lov",
						payment_type__full__subtitle: "100%",
						payment_option__title: "To'lov usuli",
						booking_info__date: "Sana:",
						booking_info__time: "Vaqt:",
						pay: "To'lash",
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
						organizer: "Tashkilotchi",
						participant: "Ishtirokchi", 
						owner__info__user: "Bandlov raqami",
						date: "Sana",
						time: "Vaqt",
						payment: "To'lov turi",
						sum: "To'langan summa",
						deposit: "Depozit (40%)",
						ull: "To'liq to'lov",
						state: "Holati",
						finished: "To'langan",
						not_finished: "To'lanmagan",
						pay: "Payme orqali to'lash",
						invite: "Taklif qilish",
						find__user: "Foydalanuvchini topish",
						search: "Qidiruv",
						link__copied: "Havola ko'chirildi",
						invite__by__link: "Havola orqali chaqirish",
						invited__users: "Taklif qilingan foydalanuvchilar",
						noone__invited: "Chaqirilganlar yo'q",
						exclude: "Chiqarib tashlash",
					},
					by_uuid: {
						title: "Sizni o'yinga chaqirishdi",
						join: "Qo'shilish",
					},
					noresult: {
						title: "Siz hali hech qanday inshootni band qilmadingiz",
						subtitle: "Saytda ko'proq tadbirlar tashkil etishga harakat qiling, siz uchun jozibali inshootlarni band qiling",
					},
				},
				profile: {
					title: "Mening profilim",
					city: "Toshkent",
					owner: "Inshoot egasi",
					settings: "Sozlamalar",
					phone: {
						content: "Ko'rsatilmagan",
						button: "Qo'shish",
						modal__number__title: "Telefon raqam",
						modal__number__subtitle: "Biz kod yuboramiz yoki qo'ng'iroq qilamiz. Qo'ng'iroqqa javob berishning hojati yo'q. Kod SMS-da keladi",
						modal__number__input: "Telefon raqamingiz",
						modal__number__button: "Kodni olish",
						modal__verificationcode__title: "Kodni kiriting",
						modal__verificationcode__subtitle: "Biz tasdiqlash kodini shu raqamga yubordik",
						modal__verificationcode__timer: "Shu vaqt mobaynida kodni kiriting",
					
					},
					about: {
						title: "Biz haqimizda",
						paragraph1: "Biz sport va faol turmush tarzini yaxshi ko'radigan ishqibozlar jamoasimiz. Bizning vazifamiz sport inshootlarini topish va band qilish jarayonini sodda, qulay va qiziqarli qilishdir. Bizning fikrimizcha, sevimli sport turlari bilan shug'ullanmoqchi bo'lgan har bir kishi uchun sport maydonchalari va inshootlariga kirish oson bo'lishi kerak.",
						paragraph2: "Bizning saytimizda siz futbol maydonchalari va tennis kortlaridan tortib suzish havzalarigacha bo'lgan turli xil sport inshootlarini osongina topishingiz va bron qilishingiz mumkin. Biz sizga eng yaxshi tanlov va qulaylikni taklif qilish uchun shahar bo'ylab keng ko'lamli inshootlar bilan hamkorlik qilamiz.",
						paragraph3: "Ammo bu hammasi emas! Shuningdek, biz sizga do'stlaringizni taklif qilish va ular bilan sport rejalaringizni baham ko'rish imkoniyatini taklif qilamiz. Bizning qulay taklifnomalarimiz bilan siz osongina mashg'ulot yoki o'yin tashkil qilishingiz va do'stlaringizni sizga qo'shilishga taklif qilishingiz mumkin. Birgalikda sport maqsadlariga erishish yanada qiziqarli va samaraliroq!",
						company_name: "Spint MCHJ",
					},
					contacts: {
						title: "Qo'llab-quvvatlash xizmati",
						phone: "Telefon raqam",
						mail: "Elektron pochta"
					},
					languages: {
						button: "Tilni o'zgartirish",
						title: "Tilni tanlang",
					},
					personal_information: {
						title: "Shaxsiy ma'lumot",
						profile__title: "Profil",
						profile__subtitle: "Siz aytgan hamma narsa bizga va boshqa o'yinchilarga sizni yaxshiroq bilishga yordam beradi",
						change_logo: "O'zgartirish",
						change_username: "Foydalanuvchi nomi",
						username_exist_error: "Ushbu foydalanuvchi nomi allaqachon mavjud",
						change_password__title: "Parolni tiklash",
						change_password__subtitle: "Siz haqiqatan ham parolingizni qayta tiklamoqchimisiz?",
						change_birth_date__title: "Tug'ilgan kun",
						change_birth_date__subtitle: "To'g'ri sanani kiriting",
						change_favorite_sports: {
							title: "Sevimli sport turlari",
							selected_sports__title: "Tanlangan sport turlari",
							subtitle: "3 ta sevimli sport turi va mahorat darajangizni tanlang",
							select_sport: "Sportni tanlang",
							select_level: "Mahorat darajangizni tanlang",
							sports: {
								title: "Turi",
								Football: "Futbol", 
								Basketball: "Basketbol", 
								Tennis: "Tennis", 
								Volleyball: "Voleybol",
  								Billiard: "Bilyard", 
								Golf: "Golf", 
								Bowling: "Bouling", 
								Table_Tennis: "Stol tennisi",
							},
							levels: {
								title: "Daraja",
								Beginner: "Boshlang'ich",
								Intermediate: "O'rta",
								Advanced: "Rivojlangan",
							}
						},
						change_free_time: {
							title: "Sport uchun bo'sh vaqt",
							subtitle: "Sport bilan shug'ullanish uchun qulay vaqtni tanlang",
							button__title: "Vaqtni tanlang",
							options: {
								Morning: "Ertalab (12:00 dan oldin)",
								Day: "Kun davomida (12:00 - 18:00)",
								Evening: "Kechqurun (18:00 - 24:00)",
								Flexible: "Moslashuvchan jadval",
							}
						},
						change_home: {
							title: "Yashash joyi",
							subtitle: "Xaritada yashash joyingizni ko'rsating",
							address: "Manzil",
							address__not_found: "Manzil topilmadi",
							address__error: "Manzil topishda xatolik",
						},
						no__button: "Yo'q",
						yes__button: "Ha",
						ready__button: "Tayyor",
						save__button: "Saqlash",
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
				partners: {
					become_partner: "Bizni hamkorizim bo'ling",
					become_partner_subtitle: "Biz bilan bog'laning va daromad oling. Bu oddiy.",
					header__title: "tarmog'imizga qo'shiling",
					header__title__span: "Sport inshootlarimiz",
					header__subtitle__mobile: "Bizning platformamiz yordamida auditoriyangizni kengaytiring va daromadingizni oshiring",
					header__subtitle__pc: "Sport platformamiz yordamida auditoriyangizni oshiring, bronlarni ko'paytiring va daromadni oshiring",
					header__button: "Hamkor bo'lish",
					benefits__title: "Hamkorlikning afzalliklari",
					benefits__item__more_bookings: "Koʻproq bandlovlar",
					benefits__item__additional_income: "Qo'shimcha daromad",
					benefits__item__simple_management: "Qulay boshqaruv",
					benefits__item__sales_analyze: "Sotuv tahlili",
					modal__title: "Telefon raqamingizni qoldiring",
					modal__button: "Yuborish",
				},
				toast: {
					create__new__user__success: "Akkaunt muvaffaqiyatli yaratildi. Akkauntingizni faollashtirish uchun elektron pochtangizga o'ting",
					create__new__user__error: "Ro‘yxatdan o‘tish muvaffaqiyatsiz tugadi. Iltimos keyinroq qayta urinib ko'ring",
					login__success: "Siz akkauntingizga kirdingiz",
					login__error: "Kirish amalga oshmadi",
					verify__success: "Akkauntingiz faollashtirildi. Akkauntingizga kiring",
					verify__error: "Akkaunt mavjud emas yoki allaqachon faollashtirilgan",
					check__authenticated: "Akkauntingiz yaroqsiz",
					reset__password__success: "manziliga parolingizni tiklash havolasi bilan xat yubordik",
					reset__password__error: "Parolni tiklashda xatolik",
					reset__password__confirm__success: "Parolingiz muvaffaqiyatli yangilandi",
					reset__password__confirm__error: "Parolni yangilashda xatolik",
					update__user__success: "Profil maʼlumotlari muvaffaqiyatli yangilandi",
					update__user__error: "Profil ma'lumotlarini yanglashda xatolik",
					load__games__error: "Oʻyin maʼlumotlarini yuklashda xatolik yuz berdi",
					load__regions__error: "Tuman maʼlumotlarini yuklashda xatolik yuz berdi",
					load__facilities__error: "Inshootlar maʼlumotlarini yuklashda xatolik yuz berdi",
					load__coordinates__error: "Inshootlar manzili koordinatalarini yuklashda xatolik yuz berdi",
					booking__success: "Muvaffaqiyatli band qilindi",
					booking__error: "Xatolik yuz berdi. Qayta urinib ko'ring",
					invite__success: "Taklifnoma yuborildi",
					invite__error: "Taklifnomani yuborishda xatolik yuz berdi",
					phonenumber__error: "Kod yuborishda xatolik yuz berdi",
					phonenumber__time__end: "Vaqt tugadi",
					phonenumber__save__success: "Telefon raqam muvaffaqiyatli qo'shildi",
					phonenumber__save__error: "Telefon raqam qo'shishda xatolik yuz berdi",
					booking__byuuid__404__error: "Bron topilmadi",
					booking__byuuid__owner__error: "Inshoot egalari o'yinga qo'shila olishmaydi",
					booking__byuuid__late__error: "Juda kech",
					booking__byuuid__organizer__error: "Siz bu o'yinni tashkilotchisisiz",
					booking__byuuid__invited__user__error: "Siz bu o'yinga allaqachon qo'shilib bo'lgansiz",
					profile__personal_information__upload_logo__type__error: "Fayl turi yaroqsiz. Faqat JPEG va PNG ruxsat etiladi",
					profile__personal_information__change_email__info: "Hozirda elekrton pochtani o'zgartirish imkoni yo'q",
					
				},
				zod_validation: {
					password__length: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
					password__letter: "Parol kamida bitta kichik harfdan iborat bo'lishi kerak",
					password__capital__letter: "Parol kamida bitta bosh harfdan iborat bo'lishi kerak",
					password__number: "Parolda kamida bitta raqam bo'lishi kerak",
					password__email: "Noto'g'ri elektron pochta",
					password__match: "Parollar mos kelmayapti",
				},
				helmet: {
					home: {
						title: "Spint - Yaqin sport inshootlarini toping va bron qiling",
						meta__description: "O'zingizga yaqin sport inshootlarini toping va bron qiling. Futbol maydonlari, tennis kortlari, basketbol maydonchalari va sport zallarini Spintda bron qilish mumkin: : futbol maydonlari, basketbol maydonchalari, tennis kortlari, basseynlar, stol tennisi, bilyard, voleybol maydonlari, bouling",
					},
					teams: {
						title: "Jamoalar",
						meta__description: "O'zinginzni jamoangizni yarating va do'stlaringizni oyinga chaqiring",
					},
					bookings: {
						title: "Mening Bandlovlarim",
						meta__description: "To'liq ma'lumot va bandlovlaringiz tarixini ko'ring",
					},
					profile: {
						title: "Mening Profilim",
						meta__description: "O'zingizni profilingiz haqida to'liq ma'lumotni ko'ring",
						personal_information: {
							title: "Shaxsiy ma'lumot",
							meta__description: "Siz aytgan hamma narsa bizga va boshqa o'yinchilarga sizni yaxshiroq bilishga yordam beradi",
						}
					},
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