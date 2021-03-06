import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Tweet from '@components/Tweet'
import { fetchTweets, listenTweetsFromFirebase } from 'firebase/client'
import { useUser } from 'hooks/useUser'
import { Tweet as TypeTweet } from 'types'

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<TypeTweet[]>([])
  const { user } = useUser()

  // console.log({ user })

  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/')
    /*
    //primera forma para obtener los tweets en home

    user && fetchTweets().then(setTweets)
    */
    /*
    // ¿Qué sucede aqui? pues basicamente escuchamos la data desde firebase para actualizarla en real time,
    // pero hay 2 prolemas =>
    // 1 => cada vez que se ejecute el useEffect se generará una nueva subscripcion
    // 2 => este componente al momento de actualizar la data no esta montando, entonces no existe el state "tweets"
    // por lo tanto nos arrojará un error en la consola.

    if (user) {
      listenTweetsFromFirebase(setTweets)
    }
    */

    //FORMA CORRECTA
    let onSubscripcion

    if (user) {
      onSubscripcion = listenTweetsFromFirebase(setTweets)
    }

    return () => {
      // ahora, ¿por qué ejecutamos onSubscipcion?, en la mayoria de casos, firebase nos regresa una promesa en sus metodos,
      // pero en una subscripcion nos devuelve una funcion para desubscribirnos y esta la almacenamos detro de onSubscripcion
      // ahora la ejecutamos solamente cuando exista un metodo para desubscribirnos dentro de "onSubscripcion"

      onSubscripcion && onSubscripcion()
    }
  }, [user])

  const renderTweets = (data) =>
    data.map(
      ({
        id,
        avatar,
        userName,
        content,
        userId,
        createdAt,
        img,
        likesCount,
        sharedCount,
        comments,
      }: TypeTweet) => {
        return (
          <Tweet
            key={id}
            id={id}
            img={img}
            avatar={avatar}
            userName={userName}
            content={content}
            userId={userId}
            createdAt={createdAt}
            likesCount={likesCount}
            sharedCount={sharedCount}
            comments={comments}
          />
        )
      }
    )

  return (
    <>
      <Head>
        <title>{`Home ${user ? `- ${user.userName} ` : ''}`}</title>
      </Head>
      <div>{renderTweets(tweets)}</div>
    </>
  )
}

export default Home
