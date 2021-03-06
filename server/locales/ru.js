// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        delete: {
          error: 'Не удалось удалить',
          success: 'Пользователь успешно удален',
        },
      },
      labels: {
        error: 'Не удалось удалить',
        success: 'Пользователь успешно удален',
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        tasks: 'Задачи',
        statuses: 'Статусы',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        name: 'Полное имя',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      statuses: {
        name: 'Имя',
        new: {
          submit: 'Создать',
          signUp: 'Регистрация',
        },
        edit: {
          title: 'Редактирование статуса',
        },
      },
      labels: {
        name: 'Имя',
        new: {
          name: 'Наименование',
          title: 'Создание метки',
          create: 'Создать',
        },
        edit: {
          title: 'Редактирование статуса',
        },
      },
    },
    formNames: {
      email: 'почтовый адрес',
      password: 'пароль',
      createdAt: 'дата создания',
      name: 'название',
    },
  },
};
