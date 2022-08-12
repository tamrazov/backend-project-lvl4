// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    buttons: {
      change: 'Изменить',
      delete: 'Удалить',
      edit: 'Редактировать',
      submit: 'Создать',
    },
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
        labels: 'Метки',
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
        title: 'Статусы',
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
          signUp: 'Регистрация',
          create: 'Создать статус',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить'
        },
        id: 'ID',
        dateCreate: 'Дата создания',
        name: 'Наименование',
      },
      labels: {
        title: 'Метки',
        name: 'Имя',
        id: 'ID',
        dateCreate: 'Дата создания',
        new: {
          name: 'Наименование',
          title: 'Создание метки',
          create: 'Создать метку',
        },
        edit: {
          title: 'Редактирование статуса',
        },
      },
      tasks: {
        id: "ID",
        name: 'Наименование',
        email: 'email',
        createdAt: 'Дата создания',
        title: 'Задачи',
        creator: 'Автор',
        status: 'Статус',
        executor: 'Исполнитель',
        dateCreate: 'Дата создания',
        new: {
          name: 'Наименование',
          title: 'Создание задачи',
          create: 'Создать задачу',
        },
      }
    },
    formNames: {
      email: 'почтовый адрес',
      password: 'пароль',
      createdAt: 'дата создания',
      name: 'название',
      description: 'Описание',
      status: 'Статус',
      executor: 'Исполнитель',
      labels: 'Метки',
    },
  },
};
