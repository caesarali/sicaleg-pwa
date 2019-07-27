<template>
    <v-dialog v-model="dialog" class="mx-2" max-width="600px" v-if="voter">
        <v-card>
            <v-card-title class="headline text-xs-center">
                Data Pemilih
            </v-card-title>
            <!-- <v-divider></v-divider> -->
            <v-card-text class="pt-2">
                <result-row field="Nama" :value="voter.name" />
                <result-row field="NIK" :value="voter.nik" />
                <result-row field="No. KK" :value="voter.kk" />
                <result-row field="Gender" :value="voter.gender | gender" />
                <result-row field="Gender" :value="voter.gender | gender" />
                <result-row field="Status" :value="voter.marital_status | marital" />
                <v-layout>
                    <v-flex xs12 md3 class="py-2">
                        Alamat <span class="mx-2" style="float: right">:</span>
                    </v-flex>
                    <v-flex class="py-2">
                        {{ 'Jl. ' + voter.addr_street + ', RT ' + voter.addr_rt + ', RW ' + voter.addr_rw + '. ' + village.name + ', ' + district.name + ', ' + city.name }}
                    </v-flex>
                </v-layout>
                <result-row field="TPS" :value="voter.tps.name" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="error" @click="revoke(data.id)" text>Hapus dari pendukung</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="teal" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ResultRow from "../../components/ResultRow";
export default {
    components: { ResultRow },
    data() {
        return {
            dialog: false,
            data: {}
        }
    },

    computed: {
        voter() {
            return Object.keys(this.data).length ? this.data.voter : null
        },
        village() {
            return this.voter.tps.village
        },
        district() {
            return this.voter.tps.village.district
        },
        city() {
            return this.voter.tps.village.district.city
        }
    },

    methods: {
        show(data) {
            this.data = data
            this.dialog = true
        },
        revoke(id) {
            this.$parent.remokeSupporter(id)
        }
    }
}
</script>
