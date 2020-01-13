#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: MIT

default: help all
	@echo "log: $@: $^"

tmp_dir ?= tmp
runtime ?= iotjs
export runtime
srcs_dir ?= lib example
srcs ?= $(wildcard *.js | sort | uniq)

main_src ?= example/index.js


help:
	@echo "## Usage: "
	@echo "# make start"

setup: setup/${runtime}

start/%: ${main_src}
	${@F} $< ${run_args}

start: start/${runtime}

clean:
	rm -rf ${tmp_dir}

cleanall: clean
	rm -f *~

distclean: cleanall
	rm -rf node_modules

setup/iotjs: ${iotjs_modules_dir}
	@echo "Expected to see IoT.js' help"
	${@F} --help ||:
	ls $<
