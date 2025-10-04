#!/bin/bash

timestamp() {
  date +%Y-%m-%d_%H-%M-%S
}

pg_dump -U sj -h localhost boxtasa >> ~/boxtasa_$(timestamp).sql
