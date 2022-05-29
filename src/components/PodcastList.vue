<script setup>
import PodcastItem from './PodcastItem.vue'

</script>

<template>
    <header v-if=" Object.keys(channel).length === 0">
        <h1 class="text-xl font-semibold">{{errorMsg}}</h1>
        <span>發生預期外的錯誤，請稍後再試</span>
    </header>
    <header  v-else>
        <div class="flex flex-row mb-[2rem]">
            <img class="h-[300px] aspect-auto p-[1rem] rounded-[10%]" :src="channel.image ? channel.image[0].url[0] : '' " alt="">
            <section class="relative flex-2 flex flex-col p-[1rem]">
                <div class="flex flex-col mb-[1rem]">
                    <h1 class="text-lg font-semibold text-white" >{{channel.title[0]}}</h1>
                    <p class="text-lg" >{{channel['itunes:author'][0]}}</p>
                    <span>4.9(2.1萬) {{channel['itunes:category'][0]['$'].text}} 每週更新兩次 </span>
                </div>

                <aside class="py-[1rem]">
                    <article class="line-clamp-3">
                        {{podcastList[0].title[0]}} {{podcastList[0]['itunes:summary'][0]}}
                    </article>
                </aside>

                <div class="absolute bottom-[1rem] left-[1rem] p-2 w-[200px] bg-zinc-800 text-center rounded-md">
                    <button class="text-purple-500 font-semibold text-lg align-bottom" >繼續</button>
                </div>
            </section>
        </div>
    </header>

    <section>
        <PodcastItem v-for="item in podcastList.slice(0,10)" :key="item.id">
            <template #episode-img>
                <img class="h-[200px] p-[1rem] rounded-[10%]" :src="item['itunes:image'][0]['$']['href']" alt="podcast-img">
            </template>

            <template #episode-name>
                <a class="hover:bg-transparent hover:underline" href="">{{item.title[0]}}</a>
            </template>

            <template #episode-date>
                {{toYYYYMMDD(item.pubDate[0])}}
            </template>

            <template #episode-describe>
                {{item['itunes:summary'][0]}}
            </template>
        </PodcastItem>
    </section>

</template>

<script>
import xml2js from 'xml2js';
import { fetchAPI } from '../helper/fetch'
import { toYYYYMMDD } from '../helper/formate'

const RSS_URL = 'https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml';

export default {
    mounted() {
        this.getFeed(RSS_URL)
    },
    methods: {
        parseXML(data) {
            let parser = new xml2js.Parser({ trim: true, explicitArray: true });
            return new Promise((resolve, reject) => {
                parser.parseString(data, (err, res) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(res.rss.channel[0])
                })
            })
        }, async getFeed(url) {
            return fetchAPI(url).then(response => {
                console.log(response)
                this.parseXML(response.data).then(data => {
                    console.log(data)
                    this.channel = data
                    this.podcastList = data.item
                    this.msg = 'done'
                })
            }).catch(err=>{
                console.log(err)
                this.errorMsg = err.message
            })
        }
    },
    data: function () {
        return {
            channel:{},
            podcastList: [],
            errorMsg: ''
        }
    }
}
</script>