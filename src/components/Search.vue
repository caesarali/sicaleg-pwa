<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="teal">
                    <v-btn icon dark @click="$root.searchDialog = false">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title class="ml-0">Cek Data Pemilih</v-toolbar-title>
                </v-toolbar>
                <!-- <v-content> -->
                    <v-container>
                        <v-layout>
                            <v-flex>
                                <v-form @submit.prevent="search()">
                                    <v-text-field v-model="key" label="Input NIK pemilih..." color="teal" clear-icon="clear" append-icon="search" :loading="searching" solo clearable>
                                    </v-text-field>
                                </v-form>
                            </v-flex>
                        </v-layout>

                        <v-layout v-if="result">
                            <v-flex>
                                <v-card>
                                    <v-card-title d-flex>
                                        <h3>Hasil Pencarian</h3>
                                        <v-spacer></v-spacer>
                                        <v-btn v-if="Object.keys(result).length && !result.is_supporter" dark text color="teal" left class="my-0 mr-3 hidden-sm-and-down" @click="add()">
                                            <v-icon dark left>mdi-plus</v-icon>
                                            Tambah pendukung
                                        </v-btn>
                                    </v-card-title>
                                    <template v-if="!result || Object.keys(result).length">
                                        <v-card-text class="pt-0">
                                            <result-row field="Nama" :value="result.name" />
                                            <result-row field="NIK" :value="result.nik" />
                                            <result-row field="No. KK" :value="result.kk" />
                                            <result-row field="Gender" :value="result.gender | gender" />
                                            <result-row field="Gender" :value="result.gender | gender" />
                                            <result-row field="Status" :value="result.marital_status | marital" />
                                            <v-layout>
                                                <v-flex xs12 md3 class="py-2">
                                                    Alamat <span class="mx-2" style="float: right">:</span>
                                                </v-flex>
                                                <v-flex class="py-2">
                                                    {{ 'Jl. ' + result.addr_street + ', RT ' + result.addr_rt + ', RW ' + result.addr_rw + '. ' + village.name + ', ' + district.name + ', ' + city.name }}
                                                </v-flex>
                                            </v-layout>
                                            <result-row field="TPS" :value="result.tps.name" />
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions class="hidden-md-and-up" v-if="!result.is_supporter">
                                            <v-btn dark text block color="teal" class="pl-0" @click="add()">
                                                <v-icon dark left>mdi-plus</v-icon>
                                                Tambah pendukung
                                            </v-btn>
                                        </v-card-actions>
                                    </template>
                                    <template v-else>
                                        <v-card-text class="text-xs-center">
                                            Data Pemilih tidak
                                        </v-card-text>
                                    </template>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                <!-- </v-content> -->
            </v-card>
        </v-dialog>

        <alert ref="alert" />
        <confirm ref="confirm" />
    </v-layout>
</template>

<script>
import $axios from "../api.js"
import Confirm from "./Confirm"
import Alert from "./Alert"
import ResultRow from "./ResultRow"
export default {
    components: {
        ResultRow, Confirm, Alert
    },
    data() {
        return {
            searching: false,
            key: null,
            result: null
        }
    },
    watch: {
        key(value) {
            if (value == '' || value == null) {
                this.result = null
            }
        },
        dialog() {
            this.searching = false
            this.key = null
            this.result = null
        }
    },
    computed: {
        dialog() {
            return this.$root.searchDialog
        },
        village() {
            return this.result.tps.village
        },
        district() {
            return this.result.tps.village.district
        },
        city() {
            return this.result.tps.village.district.city
        }
    },
    methods: {
        search() {
            this.searching = true
            $axios.get('/voter/' + this.key)
            .then(({ data }) => this.result = data)
            .catch(() => this.result = null)
            .then(() => this.searching = false)
        },

        add() {
            this.$refs.confirm.open('Ingin menambahkan pemilih sebagai pendukung ?', 'Ya! Tambahkan.', 'Batal')
            .then((confirm) => {
                if (confirm) {
                    $axios.post('/supporters', {
                        nik: this.result.nik
                    })
                    .then(({ data }) => {
                        this.result = data.data
                        this.$refs.alert.show(data.message, 'success')
                    })
                    .catch((error) => {
                        let data = error.response.data
                        this.$refs.alert.show(data.message, 'error')
                    })
                    .then(() => this.$refs.confirm.close())
                }
            })
        }
    }
}
</script>