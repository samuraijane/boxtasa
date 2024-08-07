#!/bin/bash

timestamp() {
  date +%Y-%m-%d_%H-%M-%S
}

pg_dump -U sj -h localhost playground >> ~/boxtasa_$(timestamp).sql
